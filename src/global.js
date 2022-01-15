import process from "process/browser";


class EventEmmitter {
    constructor() {
        this.events = {};
        this.eventsOnces = {};
    }
    once(eventName, fn) {
        if(!this.eventsOnces[eventName]) this.eventsOnces[eventName] = [];
        this.eventsOnces[eventName].push(fn)
    }
    on(eventName, fn) {
        if(!this.events[eventName]) this.events[eventName] = [];
        this.events[eventName].push(fn);
      
        return ()=> {
            this.events[eventName] = this.events[eventName].filter((eventFn)=> fn!==eventFn);
        }
    }
    emit(eventName, data) {
        console.log('%c emit =>', 'color:red')
        const event = this.events[eventName];

        if(event) event.forEach((fn)=> {
            fn.call(null, data)
        });
    }
    remote() {
        delete this.events
        delete this.eventsOnces
        this.events = {};
        this.eventsOnces = {};
    }
}



window.EVENT = new EventEmmitter();
window.test = true
window.gurl = document.baseURI;
window.process = process



window.send =(url, data, metod, clb)=> {
    let response;
    
    if(metod==="GET"){
        response = fetch(window.gurl + url, {
            method: "GET",
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            redirect: 'follow', 
            referrerPolicy: 'no-referrer'
        });
    }
    else response = fetch(window.gurl + url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      redirect: 'follow', 
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    });

    response.then((data)=> data.json().then((val)=> clb(val)))
}
window.useSend =(path, data, clb)=> send(path, data, "POST", clb);
window.authorize =()=> {
    let login = globalThis.$state.user.login
    let pass = globalThis.$state.user.password

    if(login && pass){
        send('auth', globalThis.$state.user, 'POST', (data)=> {
            console.log(data)
            if(!data.error){
                globalThis.$state.user = data;
                EVENT.emit("ok")
            }
            else EVENT.emit("error", data.error)
        })
    }
}
window.useEmit =(path, e)=> {
    console.log(`%c ${path}:`, 'color:red')
    console.log(e)
    EVENT.emit("api."+path, e)
}
window.useReadFile =(input, clb)=> {
    let file = input.files[0]
    let reader = new FileReader()
  
    reader.readAsDataURL(file)
  
    reader.onload =()=> {
        if(clb) clb(reader.result)
    }
    reader.onerror =()=> EVENT.emit("error", reader.error);
}
window.useFetch =(state, key)=> {
    window.send
}