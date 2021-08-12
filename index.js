require('dotenv').config()
const express = require("express");
const path = require("path");
const fs = require("fs");
const helmet = require('helmet');
const LiqPay = require('./server/liqpay');
const { Bay } = require("./server/model");
const bodyParser = require("body-parser");
const favicon = require('serve-favicon');
const db = require("quick.db");
const { adminVerify, authVerify, regVerify, setPasswordHash } = require("./server/func");
const { body } = require('express-validator');
const app = express()

app.use(helmet());
app.use(bodyParser.json({limit: "100mb"}));
app.use(bodyParser.urlencoded({limit: "100mb", extended: true, parameterLimit:50000}));
const jsonParser = bodyParser.json();
const liqpay = new LiqPay(process.env.test_key, process.env.test_private_key);



app.get("/", (req, res)=> {
    res.sendFile(__dirname+"/src/index.html")
});


app.post("/reg", jsonParser, (req, res)=> {
    let result = regVerify(req.body.login, req.body.password)

    if(result===true){
        db.set("user."+req.body.login, {
            password: setPasswordHash(req.body.password)
        })
        
        res.send(db.get("user."+req.body.login))
    }
    else res.send(result)
});
app.post("/auth", jsonParser, (req, res)=> {
    let result = authVerify(req.body.login, req.body.password)
    res.send(result)
});
app.post("/question", jsonParser, (req, res)=> {
    // ! отфильтровать
    let name = req.body.name
    let email = req.body.email
    let text = req.body.text

    db.push("questions", {name: name, email: email, text: text})
    res.send("<div>Мы свяжемся с вами в ближайшее время</div>")
});
app.post("/setFaq", jsonParser, (req, res)=> {
    let name = req.body.name
    let email = req.body.email
    let text = req.body.text

    if(!email) res.send("error email")
    else if(!name) res.send("error name")
    else if(!text) res.send("error text")
    else {
        let faq = db.get("faq")??[]
        faq.push({name:name, email:email, text:text})
        db.set("faq", faq)
        res.send("ok")
    }
});
app.post("/readSite", jsonParser, (req, res)=> {
    if(adminVerify(req)) fs.writeFile(__dirname+`/src/${req.body.url}`, req.body.data, (err)=> {
        if(err) res.send(err)
        else res.send('completed')
    });
});
app.post("/addTovar", jsonParser, (req, res)=> {
    if(adminVerify(req)){
        db.set("shop."+req.body.category, req.body.id)

        fs.readFile(__dirname+"/src/tovar.html", {encoding:"utf-8"}, (err, data)=> {
            if(err) res.send(err)
            else fs.writeFile(__dirname+`/src/${req.body.category}/${req.body.id}.html`, data, (err)=> {
                if(err) res.send(err)
                else res.send("create")
            });
        });
    }
});
app.post("/toPay", jsonParser, (req, res)=> {
    let user;
    if(db.has("user."+req.body.login)) user = db.get("user."+req.body.login)
    else user = {login:'anonimys', userAgent:req.body.userAgent}

    let bay = new Bay(user)
    let total = bay.calculate(req.body.data)
    let html = liqpay.cnb_form({
        'action'         : 'pay',
        'amount'         : total,
        'currency'       : 'UAH',
        'description'    : 'description text',
        'order_id'       : `order_id_${bay.id()}`,
        'version'        : '3'
    });
    
    res.send(html)
});

// test
app.post("/testPay", jsonParser, (req, res)=> {
    let html = liqpay.cnb_form({
        'action'         : 'pay',
        'amount'         : req.body.price,
        'currency'       : 'UAH',
        'description'    : req.body.descr,
        'order_id'       : `order_id_1`,
        'version'        : '3'
    });
    
    res.send(html)
});



app.use('/', express.static(path.join(__dirname, './src')));
app.use(favicon(path.join(__dirname, 'src', 'favicon.ico')));
app.listen(3000, ()=> console.log("listens"))