require("dotenv").config();
const LiqPay = require("../server/liqpay");
const db = require("quick.db");
const liqpay = new LiqPay(process.env.liqpay_public, process.env.liqpay_private);



Array.prototype.toStrings = function(symbol=",") {
    let rezult = '';
    this.map((elem, i)=> {
        if(i!==0) rezult += symbol + elem;
        else rezult += elem;
    });
    return rezult
}
const useTime =()=> {
    return [
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDay(),
        new Date().getHours(),
        new Date().getMinutes(),
        new Date().getSeconds()
    ].toStrings(":")
}


class Bay {
    constructor(user) {
        this.user = user
        this.tovars = db.get("tovars");
    }
    getId() {
       return db.get("pays").length;
    }
    find(o) {
        if(this.tovars[o.category]) return this.tovars[o.category].find((val)=> {
            if(val.name===o.name) return val
        });
    }
    calculate(data) {
        let result = 0;
        let finds = [];

        data.map((tovar)=> {
            let find = this.find(tovar);
            if(find){
                result += find.priceMin;
                finds.push(find)
            }
            else finds.push('error')
        });

        this.user.bays.push({
            time: useTime(),
            total: result,
            chek: finds,
            id: this.getId()
        });

        return [result, finds];
    }
}



exports.usePay =(login, data)=> {
    let user = db.get("user."+login);
    let bay = user ? new Bay(user) : new Bay({login:'anonim',bays:[]});

    let result = bay.calculate(data); 
    let request = {
        'action'         : 'pay',
        'amount'         : result[0],
        'currency'       : 'UAH',
        'description'    : 'description text',
        'order_id'       : `order_id_${bay.getId()}`,
        'version'        : '3'
    }
    
    let html = liqpay.cnb_form(request);
    request.time = useTime();
    db.push("pays", request);
    logger.info("[💵]: "+html);

    return html;
}