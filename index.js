const express = require("express");
const bodyParser = require("body-parser");
const favicon = require('serve-favicon');
const db = require("quick.db");
const { adminVerify, saveSite } = require("./server/func")
const app = express()

app.use(bodyParser.json({limit: "100mb"}));
app.use(bodyParser.urlencoded({limit: "100mb", extended: true, parameterLimit:50000}));
const jsonParser = bodyParser.json();


app.get("/", (req, res)=> {
    res.sendFile(__dirname+"/src/index.html")
});


app.post("/reg", jsonParser, (req, res)=> {

});
app.post("/auth", jsonParser, (req, res)=> {
    
});
app.post("/setFaq", jsonParser, (req, res)=> {
    let name = req.body.name
    let email = req.body.email
    let text = req.body.text

    if(!email) res.send("error email")
    else if(!name) res.send("error name")
    else if(!text) res.send("error text")
    else {
        let faq = db.get("faq")??[]
        faq.push({name:name, email:email, text:text})
        db.set("faq", faq)
        res.send("ok")
    }
});
app.post("/admin", jsonParser, (req, res)=> {
    adminVerify(req, (result)=> {
        res.send(result)
    });
});
app.post("/admin.saveSite", jsonParser, (req, res)=> {
    adminVerify(req, (result)=> {
        if(result.search('error')!==-1) res.send(result)
        else saveSite(req.body.data)
    });
});


app.use('/', express.static(path.join(__dirname, './src')));
app.use(favicon(path.join(__dirname, 'src', 'favicon.ico')));
app.listen(3000, ()=> console.log("listens"))