import React from "react";
import Form from "@rjsf/core";
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { useState } from '@hookstate/core';
import globalState from "../global.state";


const UserEdit =()=> {
    const user = useState(globalState.user);
    const [formData, setFormData] = React.useState(null);

    return(
        <div>
            <Form
                formData={formData}
                schema={globalState.schemes.user.get()}
                onChange={(e)=> setFormData(e.formData)}
                onError={(e)=> useEmit('error', e)} 
            >
                <Button 
                    style={{margin:"20px"}} 
                    color="sucess" 
                    onClick={()=> EVENT.emit("user.edit", formData)}
                > 
                    сохранить 
                </Button>
            </Form>
        </div>
    );
}
const Catalog =(props)=> {
    return(
        <>
            {globalState.user.bays.get().map((bay, i)=> {
                <div>
                    <var>{ bay.time }</var>
                    <var>{ bay.total }</var>
                    <var>{ bay.status }</var>
                </div>
            })}
        </>
    );
}



export default function User({visible, setOpen}) {
    const [activ, setActiv] = React.useState();

    
    const useExit =()=> {
        setOpen(false)
    }
    const useDir =(type)=> {
        if(type===0) setActiv(<UserEdit />);
        else if(type===1) setActiv(<Catalog />);
        else setActiv(<div>в разработке</div>);
    }
    const leftContents = (
        <>
            <Button onClick={()=> useDir('userBase')} icon="pi pi-th-large" className="p-button-secondary" />
            <Button onClick={()=> useDir('bays')} label="Лиды" icon="pi pi-shopping-cart" className="p-button-success" />
            <Button onClick={()=> useDir('userSetings')} label="Настройки" icon="pi pi-cog" className="p-button-success" />
        </>
    );
    const rightContents = (
        <Button onClick={useExit} icon="pi pi-times" className="p-mr-2 p-button-danger" />
    );


    return(
        <div style={{display:visible?"block":"none"}}>
            <Toolbar 
                left={leftContents} 
                right={rightContents} 
            />
            { activ }
        </div>
    );
}