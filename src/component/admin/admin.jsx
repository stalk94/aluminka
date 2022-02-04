import "../../css/adminka.css";
import React from "react";
import { AdminFormCreate } from "./tovar-create";
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import Leeds from './task-bay';
import DataBase from "./database";
import { useDidMount } from "rooks";




const Statstics =()=> {
    return(
        <div>
            <var>данный раздел в разработке</var>
        </div>
    );
}
const Settings =()=> {
    return(
        <div>
            <var>данный раздел в разработке</var>
        </div>
    );
}




export default function Admin({setOpen}) {
    const [body, setBody] = React.useState(<Statstics />);
    const [visible, setVisible] = React.useState(false);

    const useDir =(dir)=> {
        if(dir==='editor') setBody(<AdminFormCreate />);
        else if(dir==='fs') setBody(<var>данный раздел в разработке</var>);
        else if(dir==='setings') setBody(<Settings />);
        else if(dir==='base') setBody(<Statstics />);
        else if(dir==='leeds') setBody(<Leeds />);
        else if(dir==='db') setBody(<DataBase />);
        else setOpen(false)
    }
    useDidMount(()=> {
        EVENT.on("admin.visible", (val)=> {
            if(val===false) document.body.style.overflowY = "auto"
            else document.body.style.overflowY = "hidden"
            setVisible(val)
        });
    });
    
    
    const leftContents = (
        <>
            <Button onClick={()=> useDir('base')} icon="pi pi-th-large" className="p-button-secondary" />
            <Button onClick={()=> useDir('editor')} label="Каталог" icon="pi pi-plus-circle" className="p-mr-2" />
            <Button onClick={()=> useDir('leeds')} label="Лиды" icon="pi pi-shopping-cart" className="p-button-success" />
            <Button onClick={()=> useDir('setings')} label="Настройки" icon="pi pi-cog" className="p-button-success" />
        </>
    );
    const rightContents = (
        <>
            <Button onClick={()=> useDir('fs')} icon="pi pi-folder" className="p-mr-2 p-button-secondary" />
            <Button onClick={()=> useDir('db')} icon="pi pi-database" className="p-mr-2 p-button-secondary" />
            <Button onClick={()=> EVENT.emit("admin.visible", false)} icon="pi pi-times" className="p-mr-2 p-button-danger" />
        </>
    );


    return(
        <div style={{width:"100%",height:"100%",display:visible?"block":"none",backgroundColor:"#000000e6",zIndex:"9",position:"fixed"}}>
            <Toolbar 
                left={leftContents} 
                right={rightContents} 
            />
            { body }
        </div>
    );
}