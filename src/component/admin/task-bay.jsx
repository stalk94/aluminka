import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { SplitButton } from 'primereact/splitbutton';
import { Card } from 'primereact/card';
import { MiniCard } from "./mini-forms";
import { useState } from '@hookstate/core';
import globalState from "../../global.state";



function LeedBay({bay}) {
    const [status, setStatus] = React.useState();
    const [leed, setLeed] = React.useState(bay);
    
    React.useEffect(()=> setLeed(bay), [bay]);
    const header =()=> (
        <div className="table-header">
            <Card>
                <MiniCard>
                    {Object.values(leed.target).map((elem, i)=> (
                        <var key={i}>{elem}</var>
                    ))}
                </MiniCard>
                
                <var>{ leed.delivery }</var>
                <var>{ leed.total }</var>
            </Card>
            <SplitButton 
                label={status} 
                icon="pi pi-angle-double-right" 
                onClick={(e)=> setStatus(e.target)} 
                model={[
                    { 
                        label: 'В обработке',
                        icon: 'pi pi-spinner'
                    },{
                        label:'Оплачен',
                        icon: 'pi pi-money-bill'
                    },{
                        label:'Отправлен',
                        icon: 'pi pi-reply'
                    },{
                        label:'Доставлен',
                        icon: 'pi pi-check-circle'
                    },{
                        label:'Выполнен',
                        icon: 'pi pi-history'
                    }
                ]}
            />
        </div>
    );
    const footer =()=> (
        <div>{}</div>
    );


    return(
        <div className="datatable-templating-demo">
            <div className="card">
                <DataTable value={leed.basket} header={header} footer={footer} responsiveLayout="scroll">
                    <Column field="name" header="Наименование"></Column>
                    <Column 
                        header="Фото" 
                        body={(rowData)=> (
                            <img style={{height:"60px"}} className="product-image" src={rowData.images[0]}/>
                        )}
                    >
                    </Column>
                    <Column field="priceMin" header="Цена" body={(rowData)=> <span>{rowData.priceMin}</span>}></Column>
                    <Column field="category" header="Категория" body={(rowData)=> <span>{rowData.category}</span>}></Column>
                    <Column field="model" header="Модель" body={}></Column>
                    <Column header="кол-во" body={(rowData)=> <span>{ rowData.count }</span>}></Column>
                </DataTable>
            </div>
        </div>
    );
}


export default function Leeds() {
    const [leeds, setLeeds] = React.useState();

    useIntervalWhen(()=> 
        window.send('bays', {}, 'GET', (data)=> 
            setLeeds(data)), 3000, globalState.user.permision.upload.get());


    return(
        <div>

        </div>
    );
}