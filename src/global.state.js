import { createState } from '@hookstate/core';


const globalState = createState({
    dir: 'index',
    slides: {
        index: [
            'https://novostroyki.realt.ua/store/company/5804a174b036604e751374e7/logo/9559a88989a29efb23223aa343a489ae.jpg', 
            'https://profidom.com.ua/images/2018/statti/sam-b-stroi-komp-8_w.jpg',
            'https://upload.wikimedia.org/wikipedia/commons/3/3a/%D0%9B%D0%BE%D0%B3%D0%BE_%D0%A3%D0%BA%D1%80%D0%B1%D1%83%D0%B4.jpg'
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
            'https://upload.wikimedia.org/wikipedia/commons/3/3a/%D0%9B%D0%BE%D0%B3%D0%BE_%D0%A3%D0%BA%D1%80%D0%B1%D1%83%D0%B4.jpg'
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
            items:[]
        }]
    },
    schemes: {
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
    }
});



export default globalState