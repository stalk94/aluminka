import $ from "jqueryui";
import { fabric } from "fabric";

const shadow = document.body.attachShadow({mode: 'open'})


class Redact extends Function {
    constructor(elem) {
        let holdStart, his;
        super()
        if(!elem) his = document
        else his = elem

        his.addEventListener('mousedown', (ev)=> {
            holdStart = Date.now()
        });
        his.onmouseup =(ev)=> {
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
        }
        his.onclick =(ev)=> {
            this.$ = {
                target: ev.target,
                event: ev.type,
                x: ev.x,
                y: ev.y
            }
        }
    }
    #worker() {
        var trigger = false;
        var interval = 1;

        self.addEventListener('message', (objEvent)=> {
            if(objEvent.data === 'startTrigger') trigger = true;
            else if(objEvent.data === 'endTrigger') trigger = false;
            else if(objEvent.data === 'start') timerCountdown();
        });

        function timerCountdown() {
            if(trigger) postMessage("");
            setTimeout(timerCountdown,interval);
        }
    }
    add(func) {
        func //?
    }
    has(obj) {
        Reflect.has(obj)
    }
}



let clb = new Redact()


