

const User = {
    data: {},
    login: 'anonimos',
    purchases: (item)=> {
        if(!item) return JSON.parse(window.sessionStorage.getItem("purchases"))??[]
        else {
            let purchases = JSON.parse(window.sessionStorage.getItem("purchases"))??[]
            purchases.push(item)
            window.sessionStorage.setItem("purchases", purchases)
        }
    },
    load() {
        let data = window.localStorage.getItem("user")
        if(data!==null) this.data = JSON.parse(data)
    }
}