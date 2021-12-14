import React, { useState } from 'react';
import Title from "./component/nav";
import Navigation from "./component/navigation";
import Promo from "./component/promo";
import NotificationLayer from "./component/notification";
import FileManagers from "./component/file-manager";
import Modal from "./component/modal";
import { PhotoGalery } from './component/galery';
import { AdminFormCreate } from "./component/tovar-create";
import { Catalog, Carts } from "./component/shop";
import ReactDOM from "react-dom";


const notification = document.createElement("div");
notification.classList.add("notification")
const Context = React.createContext($state);


const App =(props)=> {
    const [visible, setVisible] = useState({fs:false, editor:true})
    const state = React.useContext(Context)
    
    return(
        <>
            <FileManagers context={state} visible={visible.fs}/>
            <AdminFormCreate visible={visible.editor} />
        </>
    );
}



ReactDOM.render(<App />, document.querySelector(".app"));
ReactDOM.render(<Navigation />, document.querySelector(".Nav"));
ReactDOM.render(<Promo />, document.querySelector(".Promo"));
ReactDOM.render(<Title />, document.querySelector(".Titles"));
ReactDOM.render(<Modal />, document.querySelector(".Modal"));
ReactDOM.render(<PhotoGalery data={$slides[getRoot()]} />, document.querySelector(".Slider"))
document.body.appendChild(notification);
ReactDOM.render(<NotificationLayer />, notification);