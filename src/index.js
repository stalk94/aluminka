import React, { useEffect, useState } from 'react';
import Title from "./component/nav";
import { MantineProvider } from '@mantine/core';
import { useNotifications, NotificationsProvider } from '@mantine/notifications';
import Navigation from "./component/navigation";
import Promo from "./component/promo";
import { PhotoGalery } from './component/galery';
import Admin from './component/admin';
import Shop from './component/shop';
import User from "./component/user";
import AuthForm from "./component/authorize";
import { PanelBays } from "./component/bay";
import { useDidMount, useWillUnmount } from 'rooks';
import { StatusGood, StatusWarning, StatusCritical } from 'grommet-icons';
import ReactDOM from "react-dom";


export const useNotify =(notifications, type, title, massage)=> {
    let color = type==='sucess' ? 'green' : (type==='warn'?'orange':'red');
    let icon = type==='sucess' 
        ? <StatusGood/> 
        : (type==='warn' ? <StatusWarning/> : <StatusCritical/>);

    return notifications.showNotification({
        title: title,
        message: massage,
        color: color,
        autoClose: 7000,
        icon: icon
    });
}



const App =()=> {
    const notifications = useNotifications();
    const [opened, setOpened] = useState(false);
    const [authorize, setAuthorize] = useState(false);
    
    useDidMount(()=> {
        EVENT.on("close.modal", (val)=> {
            if(val==='all') document.querySelector(".app").style.visibility = "hidden"
        });
        EVENT.on("close.modal", ()=> {
            setOpened(false)
            document.querySelector(".app").style.visibility = 'hidden'
            document.body.style.overflowY = "auto"
        });
        EVENT.on('open.modal', ()=> {
            if(globalThis.$state && globalThis.$state.user && globalThis.$state.user.login){
                document.querySelector(".app").style.visibility = 'visible'
                document.body.style.overflowY = "hidden"
            }
            else setOpened(true);
        });
        EVENT.on("create.tovar", (data)=> send("/create", data, "POST", (res)=> {
            if(!res.error) useNotify(notifications, "sucess", 'Успешно добавлено', res.sucess);
            else {
                useNotify(notifications, "error", 'Ошибка', res.error);
                localStorage.clear()
                document.location.reload()
            }
        }));
        EVENT.on("reg", (data)=> send("/reg", data, "POST", (res)=> {
            if(!res.error||res.sucess){
                EVENT.emit("sucess.reg", '')
                useNotify(notifications, "sucess", 'Успешно', res.sucess)
            }
            else {
                EVENT.emit("error.reg", '')
                useNotify(notifications, "error", 'Ошибка', res.error)
            }
        }));
        EVENT.on("auth", (data)=> send("/auth", data, "POST", (res)=> {
            if(!res.error){
                EVENT.emit("sucess.auth", res)
                useNotify(notifications, "sucess", 'Успешно', 'вы авторизировались')
                setAuthorize(true)
            }
            else {
                EVENT.emit("error.auth", '')
                useNotify(notifications, "error", 'Ошибка', res.error)
            }
        }));
        EVENT.on("newBay", (data)=> send("/bay", data, "POST", (res)=> {
            if(!res.error||res.sucess) EVENT.emit("sucess", res.sucess??res);
            else EVENT.emit("error", res.error);
        }));
        EVENT.on("user.edit", (data)=> send("/userEdit", data, "POST", (res)=> {
            if(!res.error||res.sucess){
                EVENT.emit("sucess.user.edit", '')
                useNotify(notifications, "sucess", 'Успешно', res.sucess)
            }
            else {
                EVENT.emit("error", '')
                useNotify(notifications, "error", 'Ошибка', res.error)
            }
        }));
        EVENT.on("add", (data)=> {
            window.$state.user.basket.push(data);
            window.store.save("добавлено в корзину");
        });
        EVENT.on("error", (data)=> useNotify(notifications, "error", 'Ошибка', data));
        EVENT.on("sucess", (data)=> useNotify(notifications, "sucess", 'Успешно', data));
    });
    useWillUnmount(()=> EVENT.remote());
    
    useEffect(()=> {
        if(!globalThis.$state) globalThis.$state = {}
        if(!globalThis.$state.user) globalThis.$state = {
            user:{
                cupons: [],
                bays: [],
                basket: [],
                firsName: undefined,
                lastName: undefined,
                login: undefined,
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
            }
        }

        if(localStorage.getItem("user")) globalThis.$state.user = JSON.parse(localStorage.getItem("user"))
        if(globalThis.$state && globalThis.$state.user && globalThis.$state.user.permision && globalThis.$state.user.permision.create){
            if(globalThis.$state.user.token) setAuthorize(true)
        }
    }, [globalThis.$state])

    return(
        <>
            <PanelBays />
            {!authorize && <AuthForm opened={opened} setOpened={setOpened} />}
            {(authorize&&(globalThis.$state&&globalThis.$state.user&&globalThis.$state.user.permision&&globalThis.$state.user.permision.create)) 
                ? <Admin visible={true} /> 
                : <User setOpen={setOpened} visible={opened} />
            }
        </>
    );
}



ReactDOM.render(
    <MantineProvider theme={{colorScheme: 'dark'}}>
        <NotificationsProvider color='' position="bottom-right" zIndex={2077}>
            <App />
        </NotificationsProvider>
    </MantineProvider>,
    document.querySelector(".app")
);
ReactDOM.render(<Title />, document.querySelector(".Titles"));
ReactDOM.render(<Navigation />, document.querySelector(".Nav"));
if(getRoot()!=='index') ReactDOM.render(<Shop />, document.querySelector(".list-tovar"));
if(getRoot()==='index') ReactDOM.render(<Promo />, document.querySelector(".Promo"));
ReactDOM.render(<PhotoGalery data={$slides[getRoot()]} />, document.querySelector(".Slider"));