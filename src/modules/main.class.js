

class Main {
    constructor(user={}) {
        this.user = user
        this.favorites = {}

        this.#getFavorites()
        send("/data", {}, "GET").then((data)=> {
            this.data = JSON.parse(data)
        });
    }
    #action(count) {

    }
    #sale(count) {
        let categorySub, tovarSub;
        let route = this.route.split("/")
        
        categorySub = this.data.action.category[route[0]]
        if(categorySub) tovarSub = this.data.action.category[route[0]][route[1]]
        let tovar = this.data.shop[route[0]][route[1]]

        let saleTotal = count * (tovar.price - (category + tovar))
        let actionTotal = this.#action(count)

        if(saleTotal > actionTotal) return actionTotal
        else return saleTotal
    }
    #setTextTitle(title, text) {
        $(".title").empty().append(`
            </h2>${title}<h2>
            <p>${text}</p>
        `);
    }
    async findCategoryRecomend() {
        let find = {}
        let result;

        this.user.payments.forEach((item)=> {
            if(!find[item.category]) find[item.category] = 1
            else find[item.category]++
        });
        let keys = Object.keys(find)
        let values = Object.values(find)

        keys.forEach((key)=> {
            if(find[key]===Math.max(values)) result = key
        });

        return result
    }
    async #getFavorites() {
        this.user.favorites.forEach((tovar)=> {
            let item = new Item(tovar)
            return item
        });
    }
    category(name) {
        this.route = name
        document.location.href = document.location.host + '/shop-list.html'
    }
    tovar(id) {
        if(this.route || this.route.search("/")===-1){
            this.route += "/"+id
            document.location.href = document.location.host + '/tovar.html'
        }
        else new Error("не передана категория")
    }
    toCart(count) {
        let totalPriceTovar = this.#sale(count)
        this.user.cart[this.route.split("/")[1]]
    }
}