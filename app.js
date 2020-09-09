            var express = require("express");
            var mongoose = require("mongoose");
            var bodyParser = require("body-parser");
            const axios = require('axios');
            var cors = require('cors')


    var User = require("./models/user");
    var Rates = require("./models/rates");

    mongoose.connect("mongodb://localhost:27017/assignment", {useNewUrlParser: true});


    var app = express();
    app.use(cors())

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());


    app.get("/",(req, res)=>{
        res.send("home page")
    });

    app.get("/currencies", (req,res)=>{
        User.find({}, (err, output)=>{
            if(err) {
                res.send(err);
            } else{
                    res.send(output);
                }
        });
    });

    app.post("/currencies",(req, res)=>{
        var model = new User({
            name: req.body.name,
            });
            model.save((err, output)=>{
                if(err) {
                    res.send(err);
                } else {    
                    res.send(output);
                }
            });
    });

   

    app.get("/exchangeRates", (req,res)=>{
        Rates.find({}, (err, output)=>{
            if(err) {
                 res.send(err);
             } else{
                 res.send(output);
                  }
            });
     });

    app.post("/exchangeRates", (req, res)=>{
        sendGetRequest(res);
    }); 
    app.put("/exchangeRates", (req, res)=>{
         updateRequest(req,res);
   
    });
    app.listen(8015, ()=>{
        console.log("server has started");
    });

    const sendGetRequest = async (res) => {
        try {
            var resp = await axios.get('https://api.exchangeratesapi.io/latest')
             var rates = new Rates({
                        rates: resp.data.rates,
                });

                rates.save((err, output)=>{
                    if(err) {
                        res.send(err);
                    } else { 
                        res.send(output);
                    }
                });
                } catch (err) {
                    console.error(err);
                }
    };
    const  updateRequest = async (req,res) => {
        const id = req.id;
        var resp = await axios.get('https://api.exchangeratesapi.io/latest')
        var rates = new Rates({
                   rates: resp.data.rates,
           });

        try { 
             Rates.updateMany({id},{rates}, (err, output)=>{
                    if(err){
                        res.send(err);
                    }else {
                        res.send(output);
                    }
                });
               
    }
    catch (err) {
        console.error(err);
    }
}