import './global';
import React from 'react';
import Title from "./component/nav";
import Nav from "./component/navigation";
import Promo from "./component/promo";
import NotificationLayer from "./component/notification";
import FileManagers from "./component/file-manager";
import Modal from "./component/modal";
import { PhotoGalery } from './component/galery';
import { AdminFormCreate } from "./component/tovar-create";
import { Catalog, Cart } from "./component/shop";
import ReactDOM from "react-dom";




const getCat =()=> document.body.getAttribute("root");
const divModal = document.createElement('div');
divModal.className = 'Modal';
document.body.appendChild(divModal);


ReactDOM.render(<Nav />, document.querySelector(".Nav"));
ReactDOM.render(<Promo />, document.querySelector(".Promo"));
ReactDOM.render(<Title />, document.querySelector(".Titles"));
ReactDOM.render(<Modal />, document.querySelector(".Modal"));
ReactDOM.render(<PhotoGalery data={$slides[getCat()]} />, document.querySelector(".Slider"))
ReactDOM.render(<FileManagers />, document.querySelector(".FileManager"));
ReactDOM.render(<NotificationLayer />, document.querySelector("footer"));