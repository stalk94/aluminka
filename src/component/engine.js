const gurl = "http://localhost:3000/";
const engine = require('store/src/store-engine');
const observe = require('store/plugins/observe');
const ls = require('store/storages/localStorage');



class EventEmmitter {
    constructor() {
      this.events = {};
    }
    on(eventName, fn) {
      if(!this.events[eventName]) this.events[eventName] = [];
      this.events[eventName].push(fn);
      
      return ()=> {
        this.events[eventName] = this.events[eventName].filter(eventFn => fn !== eventFn);
      }
    }
    emit(eventName, data) {
      const event = this.events[eventName];
      if(event){
        event.forEach((fn)=> {
          fn.call(null, data);
        });
      }
    }
}
window.store = engine.createStore(ls, observe);
window.EVENT = new EventEmmitter()

export function fileLoader(file, clb) {
  console.log(file.name)
  
  let img = document.createElement("img")
  img.classList.add("obj")
  img.file = file
  let reader = new FileReader()
  
  reader.onload = ((aImg)=> { 
      return(e)=> { 
          aImg.src = e.target.result

          clb(aImg.src)
      }
  })(img)

  reader.readAsDataURL(file)
}




export async function send(url, data, metod) {
    let response;

    if(metod==="GET"){
        response = await fetch(gurl + url, {
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
    else response = await fetch(gurl + url, {
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

    return response.json()
}
export const useSend =(path, data, clb)=> {
  send(path, data, "POST").then((res)=> {
      res.json().then(val=> clb(val))
  })
}