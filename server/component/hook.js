const db = require("quick.db");



exports.getUserState =(login, password)=> {
    let user = db.get("users."+login);
    
    if(user){
        if(user.password===password) return user
        else return {error: "password wrong"}
    }
    else return {error: "login not find"}
}
const getStates =(state)=> new Proxy(state, {
    get:(target, key)=> {
      window._tick++
      if(window._tick>10){
        window._tick = 0
        useSend("./state.get", "glob", (state)=> {
          window.__state__ = getState(state)
        })
      }
      return target[key]
    },
    set:(target, key, val)=> {
      if(!target._frame) target._frame = 0
      target._frame++
      target[key] = val
      useSend("./state.set", "glob", target)
    }
});