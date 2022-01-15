import React from "react";
import { AdminFormCreate } from "./tovar-create";
import { Toolbar } from 'primereact/toolbar';
import FileManagers from "../file-manager";
import { Button } from 'primereact/button';
import { useState } from '@hookstate/core';
import globalState from "../../global.state";


const Statstics =(props)=> {
    return(
        <div>

        </div>
    );
}
const Settings =(props)=> {
    return(
        <div>

        </div>
    );
}
const Leeds =()=> {
    return(
        <div>

        </div>
    );
}
const DataBaseEditor =()=> {
    return(
        <div>

        </div>
    );
}




export default function Admin({setOpen, visible}) {
    const [body, setBody] = React.useState(<Statstics />);

    const useDir =(dir)=> {
        if(dir==='editor') setBody(<AdminFormCreate />);
        else if(dir==='fs') setBody(<FileManagers />);
        else if(dir==='setings') setBody(<Settings />);
        else if(dir==='base') setBody(<Statstics />);
        else if(dir==='leeds') setBody(<Leeds />);
        else if(dir==='db') setBody(<DataBaseEditor />);
        else setOpen(false)
    }
    const leftContents = (
        <React.Fragment>
            <Button onClick={()=> useDir('base')} icon="pi pi-th-large" className="p-button-secondary" />
            <Button onClick={()=> useDir('editor')} label="Каталог" icon="pi pi-plus-circle" className="p-mr-2" />
            <Button onClick={()=> useDir('leeds')} label="Лиды" icon="pi pi-shopping-cart" className="p-button-success" />
            <Button onClick={()=> useDir('setings')} label="Настройки" icon="pi pi-cog" className="p-button-success" />
        </React.Fragment>
    );
    const rightContents = (
        <React.Fragment>
            <Button onClick={()=> useDir('fs')} icon="pi pi-folder" className="p-mr-2 p-button-secondary" />
            <Button onClick={()=> useDir('db')} icon="pi pi-database" className="p-mr-2 p-button-secondary" />
            <Button onClick={()=> useDir('exit')} icon="pi pi-times" className="p-mr-2 p-button-danger" />
        </React.Fragment>
    );


    return(
        <div style={{display:visible?"block":"none"}}>
            <Toolbar 
                left={leftContents} 
                right={rightContents} 
            />
            { body }
        </div>
    );
}