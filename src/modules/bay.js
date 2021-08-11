class Bay {
    constructor(login, password) {
        this.login = login
        this.pass = password
        this.root = document.createElement("div")
        this.root.className = "bay"
        this.root.textContent = `🛒:0 💰:0₴`
        this.count = 0
        this.data = {}
        this.root.addEventListener("click", ()=> {
            this.render()
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
        Object.keys(this.data).forEach((key)=> {
            this.data[key].forEach((data)=> {
                this.total += data.price
            });
        });
        this.root.textContent = `🛒:${this.count} 💰:${this.total}₴`

        return this.total
    }
    render() {
        let content = ""
        this.calculate()

        Object.keys(this.data).forEach((key)=> {
            this.data[key].forEach((data)=> {
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
                    document.querySelector(`.button#${key}_${data.name}`).addEventListener("click", (ev)=> {
                        document.querySelector(`#d_${key}_${data.name}`).remove()
                        delete this.data[key]
                        this.render()
                    });
                }
            });
        });
        
        window.modal.setContent(content)
        window.modal.addFooterBtn('Оплатить', 'tingle-btn tingle-btn--primary', ()=> {
            window.modal.close();
            this.#toPay()
        });
        window.modal.addFooterBtn('Отмена', 'tingle-btn tingle-btn--danger', ()=> {
            window.modal.close();
        });
        window.modal.open()
    }
    async #toPay() {
        let res = await send("toPay", {
            login: this.login,
            password: this.pass,
            data: this.data
        }, 'POST');

        window.modal.setContent(res)
        window.modal.open()
    }
}