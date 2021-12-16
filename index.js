require('dotenv').config();
var AES = require("crypto-js/aes");
const fs = require("fs");
const express = require("express");
const path = require("path");
const LiqPay = require('./server/liqpay');
const bodyParser = require("body-parser");
const favicon = require('serve-favicon');
const db = require("quick.db");
const app = express();
const pinoms = require('pino-multi-stream');
const session = require("express-session");
const cookieParser = require('cookie-parser');
const { midlevarePassport, time, scheme } = require("./server/midlevare");
const dist = require("./dist");


///////////////////////////////////////////////////////////////////////////////////////////
global.logger = pinoms(pinoms.multistream([{stream: fs.createWriteStream('log.log')},{stream: pinoms.prettyStream()}]))
const log = logger;
app.use(bodyParser.json({limit: "100mb"}));
app.use(bodyParser.urlencoded({limit: "100mb", extended: true, parameterLimit: 50000}));
const jsonParser = bodyParser.json();
const liqpay = new LiqPay(process.env.test_key, process.env.test_private_key);
const authenticate = midlevarePassport(session({secret:process.env.private_key,resave:true,saveUninitialized:false}), app);
const useAdminVerify =(userData)=> {
    if(userData.id===0 && userData.permision==='admin') return userData;
    else return false;
}

///////////////////////////////////////////////////////////////////////////////////////////
app.use((req, res, next)=> {
    authenticate(req)
    next()
});
app.get("/", (req, res)=> {
    res.send(dist.index)
});
app.get("/shadow-profile", (req, res)=> {
    res.send(dist['shadow-profile'])
});
app.get("/detail-plintus", (req, res)=> {
    res.send(dist['detail-plintus'])
});
app.get("/door-profile", (req, res)=> {
    res.send(dist['door-profile'])
});
app.get("/furnityra", (req, res)=> {
    res.send(dist['furnityra'])
});
app.get("/plintus", (req, res)=> {
    res.send(dist['plintus'])
});

///////////////////////////////////////////////////////////////////////////////////////////
app.post('/auth', jsonParser, (req, res)=> {
    console.log("auth:", req.body)
    if(scheme.login.test(req.body.login) && scheme.password.test(req.body.password)){
        autorize(req.body.login, req.body.password)
    }
});
app.post('/reg', jsonParser, (req, res)=> {
    console.log("reg:", req.body)
    if(!db.has("user."+req.body.login)){
        registration(req.body.login, req.body.password, (doc)=> {
           
        });
    }
});
app.post("/logout", (req, res)=> {
    logger.info(`[] logout: ${req.session.id}`);

    req.logout();
    res.cookie("connect.sid", "", {expires: new Date()});
    res.redirect("/");
});
app.post("/question", jsonParser, (req, res)=> {
    console.log("questions:", req.body)
    if(scheme.text.test(req.body.text) && scheme.login.test(req.body.name) && scheme.email.test(req.body.email)){
        db.push("questions", {
            name: req.body.name, 
            email:req.body.email, 
            text: req.body.text
        });
        res.send("Мы свяжемся с вами в ближайшее время");
    }
    else res.send({error: "validation failed"});
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
app.post("/create", jsonParser, authenticate, (req, res)=> {
    const isAuthenticated = !!req.user;

    if(req.body && isAuthenticated && useAdminVerify(req.user)){
        logger.info("[✒️🛒]:addTovar: shop/"+req.body.type)
        if(req.body && req.body.type){
            db.push("tovars."+req.body.type, req.body)
            res.send({sucess: req.body.name})
        }
        else res.send({error:"catalog error"})
    }
    else res.send({error:"admin error verify"})
});
app.post(/hook/, jsonParser, (req, res)=> {
    let p = new URL(req.url, `http://${request.headers.host}`);
    let urls = p.pathname.replace('/', '.')
    if(!db.has(urls)) db.set(urls, []);

    if(req.body && req.body.hook){
        req.body.hook.time = time()
        db.push(urls, req.body.hook)        //! not clean
    }
});
app.post("/edit", jsonParser, authenticate, (req, res)=> {
    const isAuthenticated = !!req.user;

    if(req.body && isAuthenticated && useAdminVerify(req.user)){
        let tovars = db.get("tovars."+req.body.type)
        let state = req.body.state
        tovars[req.body.id] = state
        
        db.set("tovars."+req.body.type, tovars)
        res.send(tovars[req.body.id])
    }
    else res.send({error:"ошибка в данных"})
});
app.post("/bay", jsonParser, (req, res)=> {
    console.log("bay:", req.body)
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




app.use('/', express.static(path.join(__dirname, '/src')));
app.use('/', express.static(path.join(__dirname, '/dist')));
app.use(favicon(path.join(__dirname, 'src', 'favicon.ico')));
app.listen(3000, ()=> logger.info("start server"));