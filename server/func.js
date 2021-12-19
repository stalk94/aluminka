require('dotenv').config();
const { time } = require("./midlevare");
const CryptoJS = require("crypto-js");
const db = require("quick.db");


function setPasswordHash(pass) {
    return CryptoJS.AES.encrypt(String(pass), process.env.master).toString()
}
function getPasswordHash(hashPass) {
    return CryptoJS.AES.decrypt(String(hashPass), process.env.master).toString(CryptoJS.enc.Utf8)
}
/** Кодирует в себе логин и время текущее, ключ - пароль юзера */
function tokenGeneration(login, pass) {
    return CryptoJS.AES.encrypt(login+'&'+time(), pass).toString()
}
/** Декодер токена */
function tokenDecriptor(token, pass) {
    let rez = CryptoJS.AES.decrypt(token, pass).toString(CryptoJS.enc.Utf8)

    return rez === '' 
        ? '[❌]: error token'
        : rez
}
const useAdminVerifyToken =(login, token)=> { 
    if(scheme.login.test(login) && scheme.token.test(token)){
        let user = db.get("user."+login);
        if(app.TOKEN===token && user.permision==="admin") return user
    }
}
function regVerify(login, password) {
    const p =()=> {
        if(password.length>5 && password.length<38){
            if((/[^(\w)|(\@)|(\.)|(\-)]/).test(password)) return 'error password wrong'
            else return true
        }
        else return 'error password max or min simbol'
    }

    if(login.length>4 && login.length<38){
        if((/[^(\w)|(\@)|(\.)|(\-)]/).test(login)) return 'error login wrong'
        else if(db.has("user."+login)) return 'error login busy'
        else if(p()!==true) return p()
        else return true
    }
    else return 'error login max or min simbol'
}
function authVerify(login, password) {
    const p =()=> {
        if(password.length>5 && password.length<38){
            if((/[^(\w)|(\@)|(\.)|(\-)]/).test(password)) return {error:'error password wrong'}
            else {
                let user = db.get("user."+login)

                if(user.password!==password) return {error:'error password wrong'}
                else return true
            }
        }
        else return {error:'error password max or min simbol'}
    }

    if(login.length>4 && login.length<38){
        if((/[^(\w)|(\@)|(\.)|(\-)]/).test(login)) return {error:'error login wrong'}
        else if(db.has("user."+login)){
            if(p()===true) return db.get("user."+login)
            else return p()
        }
        else return {error:'error login not find'}
    }
    else return {error:'error login max or min simbol'}
}
const verify = {
    isEmail(email) {
        return (/^\w+@\w+(\.\w+){1,3}$/).test(email)
    },
    isTel(phone) {
        return (/^\d[\d\(\)\ -]{4,14}\d$/).test(phone)
    }
}




exports.verify = verify
exports.authVerify = authVerify
exports.tokenGeneration = tokenGeneration
exports.getPasswordHash = getPasswordHash
exports.setPasswordHash = setPasswordHash