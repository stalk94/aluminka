const fs = require("fs");
const cheerio = require("cheerio");



exports.Bay = class {
    constructor(user) {
        this.user = user
        this.total = 0
    }
    guard() {

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

                        if(+tovar.price!==price) this.guard()
                        data[key][index] = price
                        this.total += price
                    }
                });
            });
        });
        return this.total
    }
    static id() {
        
    }
}