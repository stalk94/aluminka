const fs = require("fs");
const { guard } = require("./guard");
const cheerio = require("cheerio");
const db = require("quick.db");



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
                        this.total += price
                    }
                });
            });
        });
        return this.total
    }
    id() {
        db.add("bayId", 1)
        this.data.id = db.get("bayId")
        return this.data.id
    }
}