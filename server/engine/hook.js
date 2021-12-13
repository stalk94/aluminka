const db = require("quick.db");



exports.getUserState =(login, password)=> {
    let user = db.get("users."+login);
    
    if(user){
        if(user.password===password) return user
        else return {error: "password wrong"}
    }
    else return {error: "login not find"}
}