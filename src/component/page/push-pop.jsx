import "primereact/resources/themes/lara-dark-indigo/theme.css";
import "primereact/resources/primereact.min.css";          
import "primeicons/primeicons.css";
import React from 'react';
import { InputNumber } from 'primereact/inputnumber';



export default function PushPop({count, setCount}) {
    return(
        <div style={{marginLeft:"auto",marginRight:"auto"}}>
            <InputNumber 
                value={count} 
                onValueChange={(e)=> setCount(e.value)} 
                showButtons 
                buttonLayout="horizontal"
                decrementButtonClassName="p-button-danger" 
                incrementButtonClassName="p-button-success" 
                incrementButtonIcon="pi pi-plus" 
                decrementButtonIcon="pi pi-minus" 
                step={1}
                min={0}
            />
        </div>
    );
}