import {fabric} from "fabric";

const gid = 0
const staticSetStyle =(selector, newObjStyle)=> {
    [...document.styleSheets[0].cssRules].forEach((style)=> {
         style[selector] = newObjStyle
    });
}


HTMLElement.prototype.setListener = function(fn) {
    this.onclick =()=> {
        this.classList.toggle('selected')
        if(fn) fn()
    };
}
HTMLElement.prototype.onCreate = function(name) {
    this.gid = gid++ 
    this.setAttribute("name", (name??this.tagName.toLowerCase())+":"+this.gid)
    this.name = this.getAttribute("name")

    console.log(this.name, this.gid)
}
HTMLCanvasElement.prototype.onCreate = function() {
    this.fabric = new fabric.Canvas(this)
    this.style.border = "1px solid gray"
}
HTMLAnchorElement.prototype.redact = function(anchor) {
    if(typeof anchor === 'string') this.href = anchor
    else if(typeof anchor === 'object'){
        this.href = "#"+anchor.id
    }
}
HTMLImageElement.prototype.redact = function() {
    const inp = document.createElement("input")
    inp.type = "file"
    inp.click()

    inp.onchange =()=> {
        fileLoader(inp.files, (src)=> {
            this.src = src
        });
    }
}

HTMLDivElement.prototype.redact = function() {
    if(this.hasAttribute('text') && this.textContent && !this.hasAttribute('contenteditable')){
        this.style.border = "2px solid red"
        this.setAttribute('contenteditable', 'true')
    }
    else if(this.hasAttribute('text') && this.textContent && this.hasAttribute('contenteditable')){
        this.attributes.removeNamedItem('contenteditable')
        this.style.border = ""
    }
    else if(this.hasAttribute('text') && !this.hasAttribute('contenteditable')){
        this.style.border = "2px solid red"
        this.setAttribute('contenteditable', "true")
    }
    else if(this.hasAttribute('blok')){
        //редактор блока
    }
}
HTMLButtonElement.prototype.redact = function() {
    
}
HTMLCanvasElement.prototype.redact = function() {
    
}


HTMLFormElement.prototype.redact = function(url) {
    
}
HTMLInputElement.prototype.redact = function() {
    
}
HTMLOutputElement.prototype.redact = function() {
    
}

// all
HTMLMediaElement.prototype.redact = function() {
    
}