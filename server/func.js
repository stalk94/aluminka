const db = require("quick.db");
const fs = require("fs");
const CryptoJS = require('crypto-js');

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


exports.adminVerify = function(req, send) {
    if(req.body.login && req.body.password){
        let user = db.get("user."+req.body.login)
    
        if(user.password===req.body.password && user.permision==="admin") send(user)
        else send("error password or login")
    }
    else send("error form")
}

exports.verify = function(req, send) {
    
}

exports.saveSite = function(data) {
    fs.writeFile("src/"+data.name+".html", data.html, (err)=> {
        if(err) console.log(err)
    });
}