const express = require("express");
const path = require("path");
const fs = require("fs");
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
app.get(/shop/, (req, res)=> {
    let urls = req.url.split("/")
    let url = urls.slice(urls.length-2)
    let paths = __dirname+"/data/"+url[0]+"/"+url[1]+'.html'

    if(fs.existsSync(paths)) res.sendFile(paths)
    else res.sendFile(__dirname+"/src/error.html")
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
app.post("/readSite", jsonParser, (req, res)=> {
    adminVerify(req, (result)=> {
        if(result.search('error')!==-1) res.send(result)
        else fs.writeFile(__dirname+`/data/${req.body.url}`, req.body.data, (err)=> {
            if(err) res.send(err)
            else res.send('completed')
        });
    });
});
app.post("/addTovar", jsonParser, (req, res)=> {
    adminVerify(req, (result)=> {
        if(result.search('error')!==-1) res.send(result);
        else {
            db.set("shop."+req.body.category, req.body.id)

            fs.readFile(__dirname+"/src/tovar.html", {encoding:"utf-8"}, (err, data)=> {
                if(err) res.send(err)
                else fs.writeFile(__dirname+`/data/${req.body.category}/${req.body.id}.html`, data, (err)=> {
                    if(err) res.send(err)
                    else res.send("create")
                });
            });
        }
    });
});


app.use('/', express.static(path.join(__dirname, './src')));
app.use(favicon(path.join(__dirname, 'src', 'favicon.ico')));
app.listen(3000, ()=> console.log("listens"))