const Delivery = {
    init() {
        this.login = window.user.login
        this.pass = window.user.password
    },
    render(bay=Bay) {
        this.data = bay.data
        window.modal.setContent(`
            <div class="form" id="sale">
                <div class="title">🗒️Данные покупателя</div>
                <div><span>Имя:</span><input type="text" name="firstName"></div>
                <div><span>Фамилия:</span><input type="text" name="lastName"></div>
                <div><span>Email:</span><input type="email" name="email"></div>
                <div><span>Телефон:</span><input type="tel" name="phone"></div>
                <div><span>Город:</span><input type="text" name="city"></div>
                <div><span>Адрес:</span><input type="text" name="adres"></div>
            </div>
            
            
            <div class="form" id="deliver">
                <div class="title">🚚Способ доставки</div>
                <div><span>Самовывоз</span><input type="radio" name="samovuvoz"></div>
                <div><span>Новой почтой</span><input type="radio" name="newPoshta"></div>
                <div><span>Курьерской службой</span><input type="radio" name="all"></div>
            </div>
            
            
            <div class="form" id="pay">
                <div class="title">💰Способ оплаты</div>
                <div><img class="liqpay" src="src/img/icon/liqpay.svg"></img><input type="radio" name="liqpay"></div>
                <div><span>Оплата при доставке</span><input type="radio" name="all"></div>
            </div>

            ${bay.render("return")}
        `);

        window.modal.setFooterContent("")
        window.modal.addFooterBtn('Оплатить', 'tingle-btn tingle-btn--primary', ()=> {
            this.#getForm()
            this.#toPay()
        });
        window.modal.addFooterBtn('Отмена', 'tingle-btn tingle-btn--danger', ()=> {
            window.modal.close();
        });

        window.modal.open()
    },
    #getForm() {
        this.data
        $(".form#sale")
        $(".form#deliver")
        $(".form#pay")
    },
    async #toPay() {
        let res = await send("toPay", {
            login: this.login,
            password: this.pass,
            data: this.data
        }, 'POST');

        window.modal.setContent(res)
        window.modal.setFooterContent("")
        window.modal.open()
    }
}



class Bay extends Object {
    constructor() {
        super()
        Delivery.init()
        this.root = document.createElement("div")
        this.root.className = "bay"
        this.root.textContent = `🛒:0 💰:0₴`
        this.count = 0
        this.data = {}
        this.root.addEventListener("click", ()=> {
            this.render()
        });
        this.window = new tingle.modal({
            footer: true,
            stickyFooter: false,
            closeMethods: ['overlay', 'button', 'escape'],
            closeLabel: "Закрыть",
            cssClass: ['bay'],
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
    add(data={name, articul, src, price, color, category, id}) {
        this.count++

        if(this.data[data.name]) this.data[data.name].push(data)
        else {
            this.data[data.name] = []
            this.data[data.name].push(data)
        }
    }
    calculate() {
        this.total = 0
        this.data.forEach((tovar)=> {
            tovar.forEach((data)=> {
                this.total += data.price
            });
        });
        this.root.textContent = `🛒:${this.count} 💰:${this.total}₴`

        return this.total
    }
    render(snt) {
        let content = ""
        this.calculate()
        const view =()=> {
            this.modal.setContent(content)
            this.modal.addFooterBtn('Оформить доставку', 'tingle-btn tingle-btn--primary', ()=> {
                let delivery = new Delivery()
                delivery.render(this)
                this.modal.close()
            });
            this.modal.addFooterBtn('Отмена', 'tingle-btn tingle-btn--danger', ()=> {
                this.modal.close();
            });
            this.modal.open()
        }

        this.data.forEach((tovar, key)=> {
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