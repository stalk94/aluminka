import { createState } from '@hookstate/core';


const globalState = createState({
    dir: {id:'index', name:'Главная'},
    tovars: {},
    slides: {
        index: [
            'https://novostroyki.realt.ua/store/company/5804a174b036604e751374e7/logo/9559a88989a29efb23223aa343a489ae.jpg', 
            'https://profidom.com.ua/images/2018/statti/sam-b-stroi-komp-8_w.jpg',
        ],
        "detail-plintus": [
            'https://profidom.com.ua/images/2018/statti/sam-b-stroi-komp-8_w.jpg'
        ],
        "door-profile": [
            'https://profidom.com.ua/images/2018/statti/sam-b-stroi-komp-8_w.jpg'
        ],
        furnityra: [
            'https://profidom.com.ua/images/2018/statti/sam-b-stroi-komp-8_w.jpg'
        ],
        plintus: [
            'https://profidom.com.ua/images/2018/statti/sam-b-stroi-komp-8_w.jpg',
        ],
        "shadow-profile": [
            'https://profidom.com.ua/images/2018/statti/sam-b-stroi-komp-8_w.jpg'
        ]
    },
    promoText:`
        С 2015 года наша компания занимается продажей напольных плинтусов из алюминия, дверных профилей и профилей теневого шва. 
        В нашем каталоге вы сможете найти именно тот профиль, который больше всего подходит для решения ваших задач. 
        Алюминиевый профиль имеет различные формы, размеры и предназначение. Давайте поговорим об этом подробнее. 
        Самый первый раздел каталога это плоский плинтус. Плоский плинтус имеет классическую форму Л-образную, имеет плавный переход от стены к полу, 
        при этом плинтус не выглядит громоздким, так как имеет небольшую толщину. 
        Так как плинтус плоский размещение каких-либо проводов за плинтусом не представляется возможным. 
        Плинтус имеет различную высоту от 40 до 100 мм и различную ширину по полу от 11 до 18 мм. 
        Монтаж такого плинтуса осуществляется на жидкие гвозди, жидкие гвозди наносятся на заднюю поверхность плинтуса и прижимается к стене.
        Данный плинтус идет в классическом анодированном светло-сером цвете. Также данные плинтуса могут быть покрашены по желанию заказчика в любой цвет по каталогу RAL.
    `,
    user: {
        cupons: [],
        bays: [],
        basket: [],
        firstName: '',
        lastName: '',
        login: 'anonim',
        password: '',
        city: '',
        phone: '+3',
        adres: '',
        token: undefined,
        permision: {
            create:false,
            copy:false,
            move:false,
            delete:false,
            rename:false,
            upload:false,
            download:false
        },
        files: [{
            name: 'Documents',
            isDirectory: true,
            items:[{}]
        }]
    },
    schemes: {
        delivery: [
            {value: 'nov', label: 'Новой почтой'}, 
            {value: 'samo', label: 'Самовывоз'}
        ],
        pays: [
            {value: 'naloj', label: 'Наложенный платеж'}
        ],
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
                    enum: ["plintus", "furnityra", "shadow-profile", "door-profile", "detail-plintus"],
                    default: "plintus",
                    uniqueItems: true
                }
            }
        },{
            title: "Описание",
            type: "object",
            required: ["title"],
            properties: {
                price:{
                    title: "цена: ",
                    type: "number",
                    default: 100,
                    minLength: 1
                }, 
                priceMin:{
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
        },{
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
        }],
        user: {
            title: "Данные",
            type: "object",
            required: ["title"],
            properties: {
                firstName: {
                    title: "имя: ",
                    type: "string",
                    default: 'anonim'
                },
                lastName: {
                    title: "фамилия: ",
                    type: "string",
                    default: 'anonim'
                },
                phone: {
                    title: "телефон: ",
                    type: "string",
                    default: ''
                },
                city: {
                    title: "город: ",
                    type: "string",
                    default: ''
                },
                adres: {
                    title: "адрес(для доставки): ",
                    type: "string",
                    default: ''
                }
            }
        }
    },
    component: {
        navigation: [
            {id:'plintus', name:'Плинтуса'},
            {id:'detail-plintus', name:'Фурнитура для плинтусов'},
            {id:'door-profile', name:'Дверной профиль'},
            {id:'furnityra', name:'Фурнитура'},
            {id:'shadow-profile', name:'Профиля теневого шва'},
            {id:'info', name:'Помошь'},
            {id:'index', name:'Главная'},
            {id:'pays', name:'Оплата и доставка'},
            {id:'services', name:'Услуги'},
            {id:'contact', name:'Контакты'}
        ]
    }
});



export default globalState