import React, { useEffect, useState } from 'react';
import Title from "./component/nav";
import Navigation from "./component/navigation";
import Promo from "./component/promo";
import { PhotoGalery } from './component/galery';
import NotificationLayer from "./component/notification";
import Modal from "./component/modal";
import Admin from './component/admin';
import Shop from './component/shop';
import User from "./component/user";
import ReactDOM from "react-dom";


const notification = document.createElement("div");
notification.classList.add("notification");
const Context = React.createContext($state);
document.body.appendChild(notification);




const App =()=> {
    const state = React.useContext(Context)
    const [visible, setVisible] = useState({
        fs: false, 
        editor: true
    });
    
    useEffect(()=> EVENT.on("close.modal", (val)=> val==='all' && (document.querySelector(".app").style.visibility = "hidden")), [])


    return(
        <Modal>
            {$state.permisions.create 
                ? <Admin visible={visible} /> 
                : <User /> 
            }
        </Modal>
    );
}



ReactDOM.render(<App />, document.querySelector(".app"));
ReactDOM.render(<Title />, document.querySelector(".Titles"));
ReactDOM.render(<Navigation />, document.querySelector(".Nav"));
if(getRoot()!=='index') ReactDOM.render(<Shop />, document.querySelector(".list-tovar"))
if(getRoot()==='index') ReactDOM.render(<Promo />, document.querySelector(".Promo"));
ReactDOM.render(<PhotoGalery data={$slides[getRoot()]} />, document.querySelector(".Slider"));
ReactDOM.render(<NotificationLayer />, notification);