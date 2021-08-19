require('dotenv').config()
const express = require("express");
const log4js = require('log4js');
const path = require("path");
const fs = require("fs");
const LiqPay = require('./server/liqpay');
const { Bay, sincDir, loadFile } = require("./server/model");
const bodyParser = require("body-parser");
const favicon = require('serve-favicon');
const db = require("quick.db");
const { adminVerify, authVerify, regVerify, setPasswordHash, verify } = require("./server/func");
const app = express()


app.use(bodyParser.json({limit: "100mb"}));
app.use(bodyParser.urlencoded({limit: "100mb", extended: true, parameterLimit: 50000}));
const jsonParser = bodyParser.json();
const liqpay = new LiqPay(process.env.test_key, process.env.test_private_key);
log4js.configure({
    appenders: { sys: { type: "file", filename: "log.log" } },
    categories: { default: { appenders: ["sys"], level: "info" } }
});
const log = log4js.getLogger("sys")



app.get("/", (req, res)=> {
    res.sendFile(__dirname+"/src/index.html")
});


app.post("/reg", jsonParser, (req, res)=> {
    let result = regVerify(req.body.login, req.body.password)

    if(result===true){
        db.set("user."+req.body.login, {
            login: req.body.login,
            password: setPasswordHash(req.body.password),
            phone: req.body.phone
        });
        
        res.send(db.get("user."+req.body.login))
    }
    else res.send(result)
});
app.post("/auth", jsonParser, (req, res)=> {
    let result = authVerify(req.body.login, req.body.password)
    res.send(result)
});
app.post("/question", jsonParser, (req, res)=> {
    let name = req.body.name
    let email = req.body.email
    let text = req.body.text

    if(!email) res.send("error email")
    else if(!name) res.send("error name")
    else if(!text) res.send("error text")
    else {
        db.push("questions", {name: name, email: email, text: text})
        res.send("<div>Мы свяжемся с вами в ближайшее время</div>")
    }
});
app.post("/readSite", jsonParser, (req, res)=> {
    if(adminVerify(req.body.login, req.body.password)) fs.writeFile(__dirname+`/src/${req.body.url}`, req.body.data, (err)=> {
        if(err) res.send(err)
        else {
            log.info("[📝]:readSite: "+req.body.url)
            res.send('completed')
        }
    });
});
app.post("/addTovar", jsonParser, (req, res)=> {
    if(adminVerify(req.body.login, req.body.password)!==undefined){
        db.set("shop."+req.body.category, req.body.id)
        log.info("[✒️🛒]:addTovar: shop/"+req.body.category+"/"+req.body.id)

        fs.readFile("src/tovar.html", {encoding:"utf-8"}, (err, data)=> {
            if(err) res.send(err);
            fs.writeFile(`src/${req.body.category}/${req.body.id}.html`, data, (err)=> {
                if(err) res.send(err)
                else res.send("create")
            });
        });
    }
});
app.post("/toPay", jsonParser, (req, res)=> {
    let user;
    if(verify.isLogin(req.body.login) && db.has("user."+req.body.login)) user = db.get("user."+req.body.login)
    else user = {login:'anonimys'}

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

    log.info("[💵]: "+html)
    res.send(html)
});
app.post("/loadDir", jsonParser, (req, res)=> {
    let dir = req.body.dir.split(".")[0]
    res.send(sincDir(dir))
});
app.post("/readProfile", jsonParser, (req, res)=> {
    let user;

    if(verify.isLogin(req.body.login) && db.has("user."+req.body.login)) {
        user = db.get("user."+req.body.login)
        Object.keys(req.body).forEach((key)=> {
            user[key] = req.body[key]
        });

        db.set("user."+req.body.login, user)
        res.send(user)
    }
    else res.send('error')
});

// test
app.post("/testPay", jsonParser, (req, res)=> {
    let user;
    if(verify.isLogin(req.body.login) && db.has("user."+req.body.login)) user = db.get("user."+req.body.login)
    else user = {login:'anonimys'}

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

    log.info("[💵]test: "+html)
    res.send(html)
});



app.use('/', express.static(path.join(__dirname, './src')));
app.use(favicon(path.join(__dirname, 'src', 'favicon.ico')));
app.listen(3000, ()=> log.info("start server"))