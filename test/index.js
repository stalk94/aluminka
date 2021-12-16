const express = require("express");
const app = express();
const session = require('express-session');

app.use(session({
    secret: 'keyboardCat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))

app.get("/", (req, res)=> {
    console.log(req.session)
    res.send()
});



app.listen(3002, ()=> console.log("start server"));