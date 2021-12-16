import React, { useState } from 'react';
import Title from "./component/nav";
import Navigation from "./component/navigation";
import Promo from "./component/promo";
import { PhotoGalery } from './component/galery';
import NotificationLayer from "./component/notification";
import Admin from './component/admin';
import Shop from './component/shop';
import User from "./component/user";
import AuthForm from "./component/authorize";
import { PanelBays } from "./component/bay";
import { useDidMount } from 'rooks';
import ReactDOM from "react-dom";


const notification = document.createElement("div");
notification.classList.add("notification");
const Context = React.createContext($state);
document.body.appendChild(notification);




const App =()=> {
    const [opened, setOpened] = useState(false);
    const state = React.useContext(Context)
    
    useDidMount(()=> {
        EVENT.on("close.modal", (val)=> val==='all' && (document.querySelector(".app").style.visibility = "hidden"));
        EVENT.on("close.modal", ()=> {
            setOpened(false)
            document.querySelector(".app").style.visibility = 'hidden'
            document.body.style.overflowY = "auto"
        });
        EVENT.on('open.modal', ()=> {
            if($state.user && $state.user.login && $state.user.password){
                document.querySelector(".app").style.visibility = 'visible'
                document.body.style.overflowY = "hidden"
            }
            else setOpened(true);
        });
        EVENT.on("create.tovar", (data)=> send("create", data, "POST", (res)=> {
            if(!res.error) EVENT.emit("sucess", res);
            else EVENT.emit("error", res.error);
        }));
        EVENT.on("reg", (data)=> send("reg", data, "POST", (res)=> {
            if(!res.error) EVENT.emit("sucess", res);
            else EVENT.emit("error", res.error);
        }));
        EVENT.on("auth", (data)=> send("auth", data, "POST", (res)=> {
            if(!res.error) EVENT.emit("sucess", res);
            else EVENT.emit("error", res.error);
        }));
    });


    return(
        <>
            {!$state.permisions.create 
                ? <Admin visible={true} /> 
                : <User /> 
            }
            <PanelBays />
            <AuthForm opened={opened} setOpened={setOpened} />
        </>
    );
}



ReactDOM.render(<App />, document.querySelector(".app"));
ReactDOM.render(<Title />, document.querySelector(".Titles"));
ReactDOM.render(<Navigation />, document.querySelector(".Nav"));
if(getRoot()!=='index') ReactDOM.render(<Shop />, document.querySelector(".list-tovar"))
if(getRoot()==='index') ReactDOM.render(<Promo />, document.querySelector(".Promo"));
ReactDOM.render(<PhotoGalery data={$slides[getRoot()]} />, document.querySelector(".Slider"));
ReactDOM.render(<NotificationLayer />, notification);