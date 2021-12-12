require('dotenv').config();
const fs = require("fs");
const express = require("express");
const path = require("path");
const LiqPay = require('./server/liqpay');
const bodyParser = require("body-parser");
const favicon = require('serve-favicon');
const db = require("quick.db");
const pinoms = require('pino-multi-stream');
const app = express();
const { adminVerify, authVerify, regVerify, verify, tokenGeneration } = require("./server/func");
const { index } = require("./server/view/index");
const cookieParser = require('cookie-parser');


///////////////////////////////////////////////////////////////////////////////////////////
app.production = false;
app.TOKEN = tokenGeneration().generate();
app.use(bodyParser.json({limit: "100mb"}));
app.use(bodyParser.urlencoded({limit: "100mb", extended: true, parameterLimit: 50000}));
const jsonParser = bodyParser.json();
const liqpay = new LiqPay(process.env.test_key, process.env.test_private_key);
const prettyStream = pinoms.prettyStream();
const streams = [{stream: fs.createWriteStream('log.log')}, {stream: prettyStream}];
const log = pinoms(pinoms.multistream(streams));
const time =()=> new Date().getDay()+":"+new Date().getHours()+":"+new Date().getMinutes()+":"+new Date().getSeconds();


///////////////////////////////////////////////////////////////////////////////////////////
app.get("/", (req, res)=> {
    res.send(index())
});
app.get("/shadow-profile", (req, res)=> {
    res.send(require("./server/view/shadow-profile")())
});
app.get("/detail-plintus", (req, res)=> {
    res.send(require("./server/view/detail-plintus")())
});
app.get("/door-profile", (req, res)=> {
    res.send(require("./server/view/door-profile")())
});
app.get("/furnityra", (req, res)=> {
    res.send(require("./server/view/furnityra")())
});
app.get("/plintus", (req, res)=> {
    res.send(require("./server/view/plintus")())
});

///////////////////////////////////////////////////////////////////////////////////////////

app.post("/reg", jsonParser, (req, res)=> {
    let result = regVerify(req.body.login, req.body.password)

    if(result){
        db.set("user."+req.body.login, {
            login: req.body.login,
            password: req.body.password,
            phone: req.body.phone
        });
        
        res.send(db.get("user."+req.body.login))
    }
    else res.send(result)
});
app.post("/auth", jsonParser, (req, res)=> {
    let result = authVerify(req.body.login, req.body.password)

    if(!result.error && process.env.password_admin===req.body.password){
        res.cookie("token", app.TOKEN)
    }
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
app.post("/payCart", jsonParser, (req, res)=> {
    let user;
    if(verify.isLogin(req.body.login) && db.has("user."+req.body.login)) user = db.get("user."+req.body.login)
    else user = {login: 'anonimys'}

    let bay = new Bay(user)
    let total = bay.calculate(req.body.data)
    bay.id((val)=> {
        let html = liqpay.cnb_form({
            'action'         : 'pay',
            'amount'         : total,
            'currency'       : 'UAH',
            'description'    : 'description text',
            'order_id'       : `order_id_${val}`,
            'version'        : '3'
        });
    
        log.info("[💵]: "+html)
        res.send(html)
    });
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
app.post("/create", jsonParser, (req, res)=> {
    if(adminVerify(req.body.login, req.body.password)!==undefined){
        log.info("[✒️🛒]:addTovar: shop/"+req.body.type)
        let data = db.get("tovars."+req.body.type)??[]

        if(req.body.type){
            req.body.state.unshift(req.body.files)
            data.push(req.body.state)
            db.set("tovars."+req.body.type, data)
            res.send(data)
        }
        else res.send({error:"catalog error"})
    }
    else res.send({error:"admin error verify"})
});
app.post("/tovars", jsonParser, (req, res)=> {
    console.log(req.body.type)

    if(db.get("tovars."+req.body.type)) res.send(db.get("tovars."+req.body.type))
    else res.send([])
});
app.post("/new", jsonParser, (req, res)=> {
    let lids = db.get("lids")??[]

    req.body.time = time()
    lids.push(req.body)
    db.set("lids", lids)
});
app.post("/edit", jsonParser, (req, res)=> {
    let user = adminVerify(req.body.login, req.body.password)

    if(user && req.body.state && req.body.type){
        let tovars = db.get("tovars."+req.body.type)
        let state = req.body.state
        tovars[req.body.id] = state
        
        db.set("tovars."+req.body.type, tovars)
        res.send(tovars[req.body.id])
    }
    else res.send({error:"ошибка в данных"})
});
app.post("/state.get", jsonParser, (req, res)=> {
    if(req.headers.login&&req.headers.login!=="root"){
        if(req.body.arg==="files") res.send()
    }
});
app.post("/state.set", jsonParser, (req, res)=> {
    if(req.headers.login&&req.headers.login!=="root"){
        app.locals[req.headers.login] = req.body
    }
});


//admin
app.post("/file", jsonParser, (req, res)=> {
    console.log(req.cookies['token'])
    if(req.cookies['token'] && req.cookies['token']===app.TOKEN) fs.writeFile(`db/${req.body.path}/files.json`, req.body, (err)=> {
        if(!err) res.send("save")
        else res.send({error:err})
    });
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
app.use('/', express.static(path.join(__dirname, './dist')));
app.use(favicon(path.join(__dirname, 'src', 'favicon.ico')));
app.listen(3001, ()=> log.info("start server"));