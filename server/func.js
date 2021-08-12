const db = require("quick.db");
const fs = require("fs");
const CryptoJS = require('crypto-js');

const master = "qwerty"

function setPasswordHash(pass) {
    return CryptoJS.AES.encrypt(pass, master).toString()
}
function getPasswordHash(hashPass) {
    return CryptoJS.AES.decrypt(hashPass, master).toString(CryptoJS.enc.Utf8)
}
function tokenGeneration(login, pass) {
    return CryptoJS.AES.encrypt(login+'&'+TIME, pass).toString()
}
function tokenDecriptor(token, pass) {
    let rez = CryptoJS.AES.decrypt(token, pass).toString(CryptoJS.enc.Utf8)

    return rez === '' 
        ? '[❌]: error token'
        : rez
}



function adminVerify(req) {
    if(req.body.login && req.body.password){
        let user = db.get("user."+req.body.login)
    
        if(user.password===req.body.password && user.permision==="admin") return user
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
            if((/[^(\w)|(\@)|(\.)|(\-)]/).test(password)) return 'error password wrong'
            else {
                let user = db.get("user."+login)

                if(user.password!==password) return 'error password wrong'
                else return true
            }
        }
        else return 'error password max or min simbol'
    }

    if(login.length>4 && login.length<38){
        if((/[^(\w)|(\@)|(\.)|(\-)]/).test(login)) return 'error login wrong'
        else if(db.has("user."+login)) return db.get("user."+login)
        else return 'error login not find'
    }
    else return 'error login max or min simbol'
}
function saveSite(data) {
    fs.writeFile("src/"+data.name+".html", data.html, (err)=> {
        if(err) console.log(err)
    });
}


module.exports.adminVerify = adminVerify
module.exports.regVerify = regVerify
module.exports.authVerify = authVerify
module.exports.saveSite = saveSite
module.exports.setPasswordHash = setPasswordHash
module.exports.getPasswordHash = getPasswordHash