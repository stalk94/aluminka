import React from 'react';
import { AdminFormCreate } from "./component/tovar-create";
import { Catalog, Cart } from "./component/shop";
import Title from "./component/nav";
import Nav from "./component/navigation";
import Promo from "./component/promo";
import Footer from "./component/footer";
import Notification from "./component/notification";
import FileManagers from "./component/file-manager";
import { PhotoGalery } from 'src/component/galery.js';
import ReactDOM from "react-dom";





const divModal = document.createElement('div');
divModal.className = 'Modal';
document.body.appendChild(divModal);

window.onload =()=> {
    ReactDOM.render(<Promo />, document.querySelector(".Promo"));
    ReactDOM.render(<Title />, document.querySelector(".Titles"));
    ReactDOM.render(<Nav />, document.querySelector(".Nav"));
    ReactDOM.render(<Modal />, document.querySelector(".Modal"));
    ReactDOM.render(<FileManagers />, document.querySelector(".FileManager"));
}