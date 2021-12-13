const scheme = {
    admin: [{
        title: "Базовое",
        type: "object",
        required: ["title"],
        properties: {
            name: {
                title: "имя: ",
                type: "string",
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
            }, 
            action:{
                title: "акционная цена: ",
                type: "number",
                default: 80
            },
            description: {
                type: "string", 
                title: "Описание товарной позиции: "
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
                default: 80
            },
            wucota: {
                type:"number", 
                title:" высота : ",
                default: 80
            },
            height: {
                type:"number", 
                title:"длинна : ",
                default: 80
            }
        }
    }]
}
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
async function send(url, data, metod) {
    let response

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

    return await response.text();
}


window.URL.createObjectURL = webkitURL.createObjectURL
window.gurl = "http://localhost:3000/"
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
globalThis.__$schemes__ = scheme
globalThis.EVENT = new EventEmmitter()
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
globalThis.$permisions = {
    create:true,
    copy:true,
    move:true,
    delete:true,
    rename:true,
    upload:true,
    download:true
}


globalThis.getRoot =()=> document.body.getAttribute("root")
globalThis.setUrl =(url)=> document.location.href = document.location.href+"/"+url;
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
globalThis.toCat =(his)=> {
    document.location.href = document.location.href+"/"+his.getAttribute("url")
}
globalThis.userForm =(user)=> {(`
    <div class="user-form column">
        <div class="error"></div>
        <input class="input-userForm" type="email" placeholder="email" value="${user?user.email:''}">
        <input class="input-userForm" type="tel" placeholder="Телефон" value="${user?user.phone:''}">
        <input class="input-userForm" type="text" placeholder="Город" value="${user?user.city:''}">
        <input class="input-userForm" type="text" placeholder="Адрес" value="${user?user.adres:''}">
    </div>
`)}