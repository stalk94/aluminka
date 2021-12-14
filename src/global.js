function send(url, data, metod, clb) {
    let response;

    if(metod==="GET"){
        response = fetch(document.baseURI + url, {
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
    else response = fetch(document.baseURI + url, {
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
        console.log(this.events)
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
}


globalThis.EVENT = new EventEmmitter()
globalThis.$slides = {
    index: [
        'img/2.jpg', 
        'img/1.jpg'
    ],
    "detail-plintus": [],
    "door-profile": [],
    furnityra: [],
    plintus: [],
    "shadow-profile": []
}
globalThis.$schemes = {
    admin: [{
        title: "Базовое",
        type: "object",
        required: ["title"],
        properties: {
            name: {
                title: "имя: ",
                type: "string",
                minLength: 3
            },
            types: {
                title: "опции: ",
                enum:["без покрытия", "аннодированный", "крашенный"],
                default: "без покрытия",
                uniqueItems: true
            },
            model: {
                title: "модель: ",
                enum: ["led", "скрытый", "накладной"],
                default: "led",
                uniqueItems: true
            },
            category: {
                title: "категория: ",
                enum: ["Плинтуса", "Фурнитура", "Профиля теневого шва", "Дверные", "Фурнитура плинтуса"],
                default: "плинтуса",
                uniqueItems: true
            }
        }
    },
    {
        title: "Описание",
        type: "object",
        required: ["title"],
        properties: {
            standart:{
                title: "цена: ",
                type: "number",
                default: 100,
                minLength: 1
            }, 
            action:{
                title: "акционная цена: ",
                type: "number",
                default: 80
            },
            description: {
                type: "string", 
                title: "Описание товарной позиции: ",
                default: "Описание отсутствует"
            }
        }
    },
    {
        title: "Параметры",
        type: "object",
        required: ["title"],
        properties: {
            width: {
                type:"number", 
                title:"ширина: ",
                default: 80,
                minLength: 2
            },
            wucota: {
                type:"number", 
                title:" высота : ",
                default: 80,
                minLength: 2
            },
            height: {
                type:"number", 
                title:"длинна : ",
                default: 80,
                minLength: 2
            }
        }
    }]
};
globalThis.$promoText = `
    С 2015 года наша компания занимается продажей напольных плинтусов из алюминия, дверных профилей и профилей теневого шва. 
    В нашем каталоге вы сможете найти именно тот профиль, который больше всего подходит для решения ваших задач. 
    Алюминиевый профиль имеет различные формы, размеры и предназначение. Давайте поговорим об этом подробнее. 
    Самый первый раздел каталога это плоский плинтус. Плоский плинтус имеет классическую форму Л-образную, имеет плавный переход от стены к полу, 
    при этом плинтус не выглядит громоздким, так как имеет небольшую толщину. 
    Так как плинтус плоский размещение каких-либо проводов за плинтусом не представляется возможным. 
    Плинтус имеет различную высоту от 40 до 100 мм и различную ширину по полу от 11 до 18 мм. 
    Монтаж такого плинтуса осуществляется на жидкие гвозди, жидкие гвозди наносятся на заднюю поверхность плинтуса и прижимается к стене.
    Данный плинтус идет в классическом анодированном светло-сером цвете. Также данные плинтуса могут быть покрашены по желанию заказчика в любой цвет по каталогу RAL.
`;
globalThis.$state = {
    user: {},
    permisions: {
        create:true,
        copy:true,
        move:true,
        delete:true,
        rename:true,
        upload:true,
        download:true
    },
    files: [{
        name: 'Documents',
        isDirectory: true,
        items:[]
    }]
}


globalThis.on = EVENT.on;
globalThis.emit = EVENT.emit;
globalThis.once = EVENT.once;
globalThis.gurl = document.baseURI;
globalThis.store = {
    get(key) {
        return globalThis.$state[key]
    },
    set(key, value) {
        EVENT.emit(`store.${key}`, value)
        globalThis.$state[key] = value
    },
    watch(key, listener) {
        EVENT.on(`store.${key}`, listener)
    },
    unwatch(key) {
        delete EVENT.events[key]
    }
}
globalThis.getRoot =()=> document.body.getAttribute("root");
globalThis.setUrl =(url)=> document.location.href = document.location.href+"/"+url;
globalThis.toCat =(his)=> document.location.href = document.location.href+"/"+his.getAttribute("url");
globalThis.useSend =(path, data, clb)=> send(path, data, "POST", clb);
globalThis.useEmit =(path, e)=> {
    console.log(`%c ${path}:`, 'color:red')
    console.log(e)
    EVENT.emit("api."+path, e)
}
globalThis.useReadFile =(input, clb)=> {
    let file = input.files[0]
    let reader = new FileReader()
  
    reader.readAsDataURL(file)
  
    reader.onload =()=> {
        console.log(reader.result)
        if(clb) clb(reader.result)
    }
    reader.onerror =()=> EVENT.emit("error", reader.error);
}