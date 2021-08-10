const db = require("quick.db")





class Redact extends Function {
    constructor(elem) {
        let worker = new Worker("worker.js")
        let holdStart, his;
        super()

        if(!elem) his = document
        else his = elem
        this._ = his

        this._chek =()=> {
            let data = {};

            [...document.body.children].forEach((elem)=> {
                let name = elem.getAttribute("name")
                if(name && elem!==his) data[name] = elem.getBoundingClientRect()
            });

            worker.postMessage({
                his: his.getBoundingClientRect(),
                elems: data
            });
        }
        worker.onmessage =(data)=> {
            console.log(data)
        }
        
        his.addEventListener('mousedown', (ev)=> {
            holdStart = Date.now()
        });
        his.onmouseup =(ev)=> {
            this.$select = ""
            this.$active = undefined
            let selection = window.getSelection().toString()

            if(selection.tagName!=="BODY") this.$select = selection
            if(document.activeElement.tagName!=="BODY") this.$active = document.activeElement

            this.$ = {
                target: ev.target,
                event: ev.type,
                x: ev.x,
                y: ev.y,
                time: Date.now() - holdStart
            }
            if(this.$select) this.run('select', this.$select)
            if(this.$active) this.run('active', this.$active)
            console.log(this.$)
        }
        his.onclick =(ev)=> {
            this.$ = {
                target: ev.target,
                event: ev.type,
                x: ev.x,
                y: ev.y
            }
            this.run('click', ev.target)
        }
        his.ondblclick =(ev)=> {
            this.$$ = {
                target: ev.target,
                event: ev.type,
                x: ev.x,
                y: ev.y
            }
            this.run('double', ev.target)
        }
    }
    has(obj) {
        Reflect.has(obj)
    }
    run(type, data) {
        if(type==="click"){
            if(data.redact) data.redact()
        }
    }
}