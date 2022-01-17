require('dotenv').config();
const fs = require("fs");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const favicon = require('serve-favicon');
const db = require("quick.db");
const app = express();
const pinoms = require('pino-multi-stream');
const cookieParser = require('cookie-parser');
const { setPasswordHash, tokenGeneration, getPasswordHash } = require("./server/func");
const { time, scheme } = require("./server/midlevare");



app.use(cookieParser());
const jsonParser = bodyParser.json();
app.use(bodyParser.json({limit: "100mb"}));
app.use(bodyParser.urlencoded({limit: "100mb", extended: true, parameterLimit: 50000}));
global.logger = pinoms(pinoms.multistream([{stream: fs.createWriteStream('log.log')},{stream: pinoms.prettyStream()}]));
process.on("uncaughtException", (err)=> {
    logger.error(err);
    db.set("LOG."+time(), fs.readFileSync("log.log", {encoding:"utf-8"}));
    process.exit();
});
global.activ = {};



///////////////////////////////////////////////////////////////////////////////////////////
const useAdminVerify =(userData)=> {
    if(userData.permision && userData.permision.create===true) return userData;
    else return false;
}
const autorize =(login, password)=> {
    let user = db.get("user."+login);

    if(user && user.password && getPasswordHash(user.password)===password) return user;
    else return false;
}


///////////////////////////////////////////////////////////////////////////////////////////
app.get("/", (req, res)=> {
    //let token = req.cookies ? req.cookies['token'] : undefined
    //let user = global.activ[token]

    res.sendFile(__dirname+'/dist/index.html');
});
app.get('/getAllTovars', (req, res)=> {
    res.send(db.get("tovars"))
});
app.get('/bays', (req, res)=> {
    res.send(db.get("bays"))
});
app.get("/slides", (req, res)=> {
    res.send(db.get("slides"))
});
app.get("/logout", (req, res)=> {
    logger.info(`[🚪] logout: ${req.cookies['token']}`);

    delete app.activ[req.cookies['token']]
    res.clearCookie('token');
    res.redirect("/");
});


///////////////////////////////////////////////////////////////////////////////////////////
app.post('/auth', jsonParser, (req, res)=> {
    if(req.body.password && req.body.login){
        if(scheme.login.test(req.body.login) && scheme.password.test(req.body.password)){
            let user = autorize(req.body.login, req.body.password);
            if(user && user!==false){
                logger.info(`[🗝️]authorization user: ${req.body.login}`);
                let userCopy = Object.assign({}, user);
                delete userCopy.password;
                userCopy.token = tokenGeneration(req.body.login, req.body.password);
                global.activ[userCopy.token] = userCopy;

                res.cookie('token', userCopy.token);
                res.send(userCopy);
            }
            else res.send({error: "проверьте правильность введенных данных"});
        }
        else res.send({error: "используйте только символы [0-9], [_,-]"});
    }
    else res.send({error: "вы не ввели логин либо пароль"});
});
app.post('/reg', jsonParser, (req, res)=> {
    if(db.has("user."+req.body.login)===false){
        if(scheme.login.test(req.body.login) && scheme.password.test(req.body.password)){
            logger.info(`[😊]new registration: ${req.body.login}`);

            db.set("user."+req.body.login, {
                login: req.body.login, 
                password: setPasswordHash(req.body.password),
                firsName: '',
                lastName: '',
                total: 0,
                phone: '',
                city: '',
                phone: '+3',
                adres: '',
                bays: [],
                cupons: [],
                basket: [],
                permision: {
                    create:false,
                    copy:false,
                    move:false,
                    delete:false,
                    rename:false,
                    upload:false,
                    download:false
                },
                files: [{
                    name: 'Documents',
                    isDirectory: true,
                    items:[]
                }]
            });
            res.send({sucess: "Спасибо за регистрацию. Теперь авторизируйтесь"})
        }
        else res.send({error: "используйте только символы [0-9], [_,-]"})
    }
    else res.send({error: "логин занят"})
});
app.post("/question", jsonParser, (req, res)=> {
    if(scheme.text.test(req.body.text) && scheme.login.test(req.body.name) && scheme.email.test(req.body.email)){
        logger.info("[🎫]new massage administration:", req.body);
        db.push("questions", {
            name: req.body.name, 
            email:req.body.email, 
            text: req.body.text
        });
        res.send({sucess: "Мы свяжемся с вами в ближайшее время"});
    }
    else res.send({error: "validation failed"});
});
app.post("/bay", jsonParser, (req, res)=> {
    if(!req.cookies['token'] && req.body.basket){
        db.push("bays", {
            anonim: req.body.basket, 
            time: time()
        });
        res.send({sucess: 'Ваш заказ оформлен и будет в ближайшее время рассмотрен'});
    }
    else if(req.cookies['token'] && req.body.basket && global.activ[req.cookies['token']]){
        let user = global.activ[req.cookies['token']];
        db.push("bays", {
            [user.login]: req.body.basket, 
            time: time()
        });
        user.bays.push({[time()]: req.body.basket});
        user.basket = []

        db.set("user."+user.login, user);
        res.send({sucess: 'Ваш заказ оформлен и будет в ближайшее время рассмотрен'});
    }
    else if(!req.body.bay) res.send({error: 'ничего не оформлено'});
    else logger.error(`[🔥] bay error: ${req.body.toString()}`);
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
    
        logger.info("[💵]: "+html)
        res.send(html)
    });
});
app.post(/hook/, jsonParser, (req, res)=> {
    let p = new URL(req.url, `http://${request.headers.host}`);
    let urls = p.pathname.replace('/', '.');
    if(!db.has(urls)) db.set(urls, []);

    if(req.body && req.body.hook){
        req.body.hook.time = time()
        db.push(urls, req.body.hook)        //! not clean
    }
});
app.post("/userEdit", jsonParser, (req, res)=> {
    let token = req.cookies ? req.cookies['token'] : undefined;
    let user = global.activ[token];

    if(user){
        Object.keys(req.body).map((key)=> {
            if(key!=='login'&&key!=='password'&&key!=='token'&&key!=='cupon'&&key!=='basket'&&key!=='bays'){
                if(user[key]) user[key] = req.body[key]
            }
        });
        db.set("user."+user.login, user)
        res.send({sucess: "данные успешно изменены"})
    }
    else res.send({error: "ошибка токена"})
});


// admin
app.post("/file", jsonParser, (req, res)=> {
    if(req.cookies['token'] && req.cookies['token']===app.TOKEN) fs.writeFile(`db/${req.body.path}/files.json`, req.body, (err)=> {
        if(!err) res.send("save")
        else res.send({error:err})
    });
});
app.post("/create", jsonParser, (req, res)=> {
    let token = req.cookies['token'];
    let user = global.activ[token]
    
    if(req.body && user && useAdminVerify(user)!==false){
        logger.info("[✒️🛒]:добавлен товар: shop/"+req.body.category);
        if(req.body.category){
            db.push("tovars."+req.body.category, req.body);
            res.send({sucess: req.body.name});
        }
        else res.send({error:"catalog error"})
    }
    else res.send({error:"ошибка авторизации администратора, неудачные попытки более 5 раз приведут к бану по ip"})
});
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

    logger.info("[💵]test: "+html)
    res.send(html)
});



app.use('/', express.static(path.join(__dirname, '/src')));
app.use('/', express.static(path.join(__dirname, '/dist')));
app.use(favicon(path.join(__dirname, 'src', 'favicon.ico')));
app.listen(3000, ()=> logger.info("start server"));