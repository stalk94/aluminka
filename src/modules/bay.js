const Delivery = {
    init() {
        if(window.user && window.user.login){
            this.login = window.user.login
            this.pass = window.user.password
        }
        else {
            this.login = 'anonim'
        }
    },
    render(bay) {
        this.data = bay.data
        window.modal.setContent(`
            <div class="form" id="sale">
                <div class="title">🗒️Данные покупателя</div>
                <div><span>Имя:</span><input type="text" value="${window.user.firstName?window.user.firstName:""}" name="firstName"></div>
                <div><span>Фамилия:</span><input type="text" value="${window.user.lastName?window.user.lastName:""}" name="lastName"></div>
                <div><span>Email:</span><input type="email" value="${window.user.email?window.user.email:""}" name="email"></div>
                <div><span>Телефон:</span><input type="tel" value="${window.user.phone?window.user.phone:""}" name="phone"></div>
                <div><span>Город:</span><input type="text" value="${window.user.city?window.user.city:""}" name="city"></div>
                <div><span>Адрес:</span><input type="text" value="${window.user.adres?window.user.adres:""}" name="adres"></div>
            </div>
            
            
            <div class="form" id="deliver">
                <div class="title">🚚Способ доставки</div>
                <div><span>Самовывоз</span><input type="radio" name="samovuvoz"></div>
                <div><span>Новой почтой</span><input type="radio" name="newPoshta"></div>
                <div><span>Курьерской службой</span><input type="radio" name="all"></div>
            </div>
            
            
            <div class="form" id="pay">
                <div class="title">💵Способ оплаты</div>
                <div><img class="liqpay" src="src/img/icon/liqpay.svg"></img><input type="radio" name="liqpay"></div>
                <div><span>Оплата при доставке</span><input type="radio" name="all"></div>
            </div>

            ${bay.render("return")}
        `);

        window.modal.setFooterContent("")
        window.modal.addFooterBtn('Оплатить', 'tingle-btn tingle-btn--primary', ()=> {
            this.toPay(this.getForm())
        });
        window.modal.addFooterBtn('Отмена', 'tingle-btn tingle-btn--danger', ()=> {
            window.modal.close();
        });

        window.modal.open()
    },
    getForm() {
        let data = {
            sale: {},
            deliver: {},
            pay: {}
        };
        
        [...document.querySelector(".form#sale").children].forEach((elem)=> {
            data.sale[elem.getAttribute("name")] = elem.value
        });
        [...document.querySelector(".form#deliver").children].forEach((elem)=> {
            // только там где флаг стоит
            if(elem.value) data.deliver[elem.getAttribute("name")] = elem.value
        });
        [...document.querySelector(".form#pay").children].forEach((elem)=> {
            // только там где флаг стоит
            if(elem.value) data.pay[elem.getAttribute("name")] = elem.value
        });

        return data
    },
    async toPay(deliveryData) {
        let res = await send("toPay", {
            login: this.login,
            password: this.pass,
            data: this.data
        }, 'POST');

        window.modal.setContent(res)
        window.modal.setFooterContent("")
    }
}



class Bay extends Object {
    constructor() {
        super()
        Delivery.init()
        this.root = document.createElement("div")
        this.root.className = "bay"
        this.root.textContent = `🛒: 0 💵: 0₴`
        this.count = 0
        this.data = {}
        this.root.addEventListener("click", ()=> {
            this.render()
        });
        this.modal = new tingle.modal({
            footer: true,
            stickyFooter: false,
            closeMethods: ['overlay', 'button', 'escape'],
            closeLabel: "Закрыть",
            cssClass: ['modal'],
            onOpen: function() {
                console.log('modal open');
            },
            onClose: function() {
                console.log('modal closed');
            },
            beforeClose: function() {
                return true;
                return false;
            }
        });

        document.querySelector(".two-nav").appendChild(this.root)
    }
    add(data={name, articul, src, price, count, info, category, id}) {
        this.count++

        if(this.data[data.name]) this.data[data.name].push(data)
        else {
            this.data[data.name] = []
            this.data[data.name].push(data)
        }
        this.calculate()
    }
    calculate() {
        this.total = 0
        
        Object.keys(this.data).forEach((key)=> {
            this.data[key].forEach((data)=> {
                this.total += (data.price * data.count)
            });
        });

        this.root.textContent = `🛒: ${this.count} 💵: ${this.total}₴`
        return this.total
    }
    #setButton() {
        this.initButton = true
        this.modal.addFooterBtn('Оформить доставку', 'tingle-btn tingle-btn--primary', ()=> {
            Delivery.render(this)   //переходим к доставке
            this.modal.close()
        });
        this.modal.addFooterBtn('Отмена', 'tingle-btn tingle-btn--danger', ()=> {
            this.modal.close();
        });
    }
    render(snt) {
        let content = ""
        this.calculate()
        const view =()=> {
            this.modal.setContent(content)
            if(!this.initButton) this.#setButton()
            this.modal.open()
        }

        Object.keys(this.data).forEach((key)=> {
            let tovar = this.data[key]

            tovar.forEach((data)=> {
                if(data){
                    content += `
                        <div id="d_${key}_${data.name}">
                            <p>Наименование: ${data.name}</p>
                            <p>Артикул: ${data.articul}</p>
                            <strong>Цена: ${data.price}₴</strong>
                            ${data.color}
                            <div class="button" id="${key}_${data.name}">x</div>
                        </div>
                    `;

                    $(`.button#${key}_${data.name}`).on("click", ()=> {
                        document.querySelector(`#d_${key}_${data.name}`).remove()
                        delete this.data[key]
                        this.render()
                    });
                }
            });
        });

        if(!snt) view()
        else return content
    }
}



class Partials {
    constructor() {
        document.querySelector("body").innerHTML += `<div class="svg-window line"></div>` ;
        this.window = document.querySelector(".svg-window")
        this.window.style.display = "none"
        this.#loadCart()
    }
    async #loadCart() {
        let carts = await send("loadCart", {
            login: window.user.login, 
            password: window.user.password
        }, "POST");

        if(carts!=="error.html"){
            this.data = JSON.parse(carts)
            this.render()
        }
        else console.log("error !!!")
    }
    render() {
        let render = []
        Object.keys(this.data).forEach((key)=> {
            if(this.data[key]) render.push(`<div class="list-render">${this.data[key]}</div>`)
        });
        this.window.innerHTML = render.toString()
    }
}