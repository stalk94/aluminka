const fs = require("fs");
const CryptoJS = require("crypto-js");
const db = require("quick.db");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;


exports.time =()=> new Date().getDay()+":"+new Date().getHours()+":"+new Date().getMinutes()+":"+new Date().getSeconds();
const wrap =(middleware)=> (expres, next)=> middleware(expres.request, {}, next);
exports.scheme = {
    login: RegExp(/^[a-z0-9_-]{3,21}$/),
    password: RegExp(/^[a-z0-9_-]{6,34}$/),
    text: RegExp(/^[a-z0-9_-]{3,512}$/),
    email: RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)
}


exports.decrypt =(pass, login)=> {
    let bytes  = CryptoJS.AES.decrypt(pass, login);
    return bytes.toString(CryptoJS.enc.Utf8);
}
exports.midlevarePassport =(sessionMiddleware, app, io)=> {
    passport.use(new LocalStrategy((login, password, done)=> {
        if(exports.scheme.login.test(login) && exports.scheme.password.test(password)){
            let user = db.get("user."+login);

            if(!user) return done(null, false);
            else if(user.password!==exports.decrypt(password, login)) return done(null, false);
            else return done(null, user)
        }
        else return done(null, false);
    }));
    passport.serializeUser((user, cb)=> {
        logger.info(`serializeUser ${user.id}`);
        db.set("user."+user.login, user);
        cb(null, user.id);
    });
    passport.deserializeUser((id, cb)=> {
        logger.info(`deserializeUser ${id}`);
        let user = Object.values(db.get("user"))[id];
        cb(null, user);
    });
    const authenticate = passport.authenticate("local", {
        successRedirect: "/", 
        failureRedirect: "/",
        session: true
    });

    app.use(sessionMiddleware);
    app.use(passport.initialize());
    app.use(passport.session());

    if(io){
        io.use((socket, next)=> {
            if(socket.request.user) next();
            else next(new Error('unauthorized'));
        });
        io.use(wrap(sessionMiddleware));
        io.use(wrap(passport.initialize()));
        io.use(wrap(passport.session()));
    }
    
    return authenticate
}