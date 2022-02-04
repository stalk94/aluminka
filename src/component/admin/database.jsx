import React from "react";
import globalState from "../../global.state";
import { useState } from '@hookstate/core';
import { Dropdown } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';


const option = [
    {label:'Плинтуса', value:"plintus"},
    {label:'Фурнитура', value:"furnityra"},
    {label:'Профиля теневого шва', value:"shadow-profile"},
    {label:'Дверной профиль', value:"door-profile"},
    {label:'Фурнитура для плинтусов', value:"detail-plintus"}
];

export default function DataBaseEditor() {
    const state = useState(globalState.tovars);
    const [curent, setCurent] = React.useState({label:'Плинтуса', value:"plintus"});
    

    const useButton =(type)=> {
        if(type==='eye') console.log(type);
        else if(type==='edit') console.log(type);
        else console.log(type);
    }
    const onChange =(ev)=> {
        console.log(ev)
    }
    const itemTemplate =(item)=> {
        return(
            <div className="product-item">
                <div className="image-container">
                    <img src={item.src} />
                </div>
                <div className="product-list-detail">
                    <h5 className="mb-2">
                        { item.name }
                    </h5>
                    <i className="pi pi-dollar"></i>
                    <i className="pi pi-sort-up"></i>
                    <span className="product-category">
                        { item.price } грн
                    </span>
                    <i className="pi pi-dollar"></i>
                    <i className="pi pi-sort-down"></i>
                    <span className="product-category">
                        { item.priceMin } грн
                    </span>
                </div>
                <div className="product-list-action">
                    <Button onClick={()=> useButton('eye')} icon="pi pi-eye" className="p-mr-2" />
                    <Button onClick={()=> useButton('edit')} icon="pi pi-pencil" className="p-button-success" />
                    <Button onClick={()=> useButton('del')} icon="pi pi-ban" className="p-button-warn" />
                </div>
            </div>
        );
    }
    const useFind =(val)=> {
        setCurent(option.find((elem)=> elem.value===val && elem))
        console.log(curent)
    }
    React.useState(()=> {
        send("getAllTovars", {}, "GET", globalState.tovars.set);
    }, []);
    

    return(
        <DataTable
            header={
                <Dropdown
                    optionLabel={curent.label}
                    value={curent.value} 
                    options={option}
                    onChange={(e)=> useFind(e.target.value)}
                />
            }
            source={state.get()[curent.value] ?? []}
            itemTemplate={itemTemplate}
            onChange={onChange}
        />
    );
}