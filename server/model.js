const glob = require('glob');
const fs = require("fs");
const log4js = require('log4js');
const { guard } = require("./guard");
const cheerio = require("cheerio");
const log = log4js.getLogger("sys");


exports.Bay = class {
    constructor(user) {
        this.user = user
        this.total = 0
    }
    calculate(data) {
        this.data = data

        Object.keys(data).forEach((key)=> {
            data[key].forEach((tovar, index)=> {
                fs.readFile("src/"+tovar.category+"/"+tovar.id+".html", {encoding:'utf-8'}, (err, data)=> {
                    if(err) console.log(err)
                    else {
                        let $ = cheerio.load(data)
                        let price = +$(".price").text().replace("₴", "").trim()

                        if(+tovar.price!==price) guard('save', data)
                        data[key][index] = price
                        this.total += (price * tovar.count)
                    }
                });
            });
        });
        
        return this.total
    }
    id(clb) {
        cache.get("pays.count", (err, data)=> {
            if(err) log.error(err)
            else {
                this.data.id = +data + 1
                cache.set("pays.count", this.data.id)
                clb(his.data.id)
            }
        });
    }
}


exports.loadFile = function(data, category, id) {
    let $ = cheerio.load(data)
    $("body").attr("category", category)
    $("body").attr("id", id)

    return $.html()
}
exports.addCart = function(cart, category, clb) {
    fs.readFile(`src/shop/${category}.html`, {encoding:"utf-8"}, (err, data)=> {
        if(err) log.error(err)
        else {
            let $ = cheerio.load(data)
            $(".list-tovar").append(cart)

            fs.writeFile(`src/shop/${category}.html`, $.html(), {encoding:"utf-8"}, (err)=> {
                if(!err) clb($(".list-tovar").html())
            });
        }
    });
}
exports.loadAllTovar =(clb)=> {
    glob.sync("src/shop/*.html").forEach((key)=> {
        fs.readFile(key, (err, data)=> {
            if(err) clb(err);
            else {
                let $ = cheerio.load(data)
                clb(key, $(".list-tovar").html().trim())
            }
        });
    });
}