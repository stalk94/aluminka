import "./global";
import React from 'react';
import { useState } from '@hookstate/core';
import { MantineProvider } from '@mantine/core';
import { useNotifications, NotificationsProvider } from '@mantine/notifications';
import Admin from './component/admin/admin';
import User from "./component/user";
import AuthForm from "./component/authorize";
import { PanelBays } from "./component/page/bay";
import { useDidMount } from 'rooks';
import { StatusGood, StatusWarning, StatusCritical } from 'grommet-icons';
import Shop from './component/page/shop';
import Index from './component/page/index';
import globalState from "./global.state";
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
    const glob = useState(globalState);
    const [opened, setOpened] = React.useState(false);
    const [authorize, setAuthorize] = React.useState(false);
    

    const useExit =(res)=> {
        useNotify(notifications, "error", 'Ошибка', res.error);
        localStorage.clear()
        document.location.reload()
    }
    useDidMount(()=> {
        if(!window.test) window.send('getAllTovars', {}, 'GET', (data)=> {
            glob.tovars.set(data);
        });
        EVENT.on("close.modal", (val)=> {
            if(val==='all') document.querySelector(".app").style.visibility = "hidden"
        });
        EVENT.on("close.modal", ()=> {
            setOpened(false)
            document.querySelector(".app").style.visibility = 'hidden'
            document.body.style.overflowY = "auto"
        });
        EVENT.on('open.modal', ()=> {
            if(glob.user.login.get()!=='anonim'){
                document.querySelector(".app").style.visibility = 'visible'
                document.body.style.overflowY = "hidden"
            }
            else setOpened(true);
        });
        EVENT.on("create.tovar", (data)=> send("create", data, "POST", (res)=> {
            if(!res.error) useNotify(notifications, "sucess", 'Успешно добавлено', res.sucess);
            else useExit(res);
        }));
        EVENT.on("reg", (data)=> send("reg", data, "POST", (res)=> {
            if(!res.error||res.sucess){
                EVENT.emit("sucess.reg", '')
                useNotify(notifications, "sucess", 'Успешно', res.sucess)
            }
            else {
                EVENT.emit("error.reg", '')
                useNotify(notifications, "error", 'Ошибка', res.error)
            }
        }));
        EVENT.on("auth", (data)=> send("auth", data, "POST", (res)=> {
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
        EVENT.on("newBay", (data)=> send("bay", data, "POST", (res)=> {
            if(!res.error||res.sucess) EVENT.emit("sucess", res.sucess??res);
            else EVENT.emit("error", res.error);
        }));
        EVENT.on("user.edit", (data)=> send("userEdit", data, "POST", (res)=> {
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
            glob.user.basket.set((st)=> {
                st.push(data)
                return st
            });
            useNotify(notifications, "sucess", 'Успешно добавлено', "добавлено в корзину");
        });
        EVENT.on("error", (data)=> useNotify(notifications, "error", 'Ошибка', data));
        EVENT.on("sucess", (data)=> useNotify(notifications, "sucess", 'Успешно', data));
    });


    return(
        <>
            <PanelBays />
            <div style={{position:"fixed",width:"100%",backgroundColor:"#000000e6",zIndex:"9"}}>
                { authorize===false && <AuthForm opened={opened} setOpened={setOpened} /> }
                {(authorize===true && glob.get().user.permision.create) 
                    ? <Admin setOpen={setOpened} visible={opened} permisions={glob.get().user.permision} /> 
                    : <User setOpen={setOpened} visible={opened} />
                }
            </div>
            {glob.dir.get()==='index' 
                ?  <Index />
                : (glob.dir.get()!=='services'&&glob.dir.get()!=='payment'&&glob.dir.get()!=='contact'
                    ? <Shop />
                    : ""
                )
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
    document.querySelector(".root")
);