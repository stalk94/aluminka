import "primereact/resources/themes/lara-dark-indigo/theme.css";
import "primereact/resources/primereact.min.css";          
import "primeicons/primeicons.css";   
import React from "react";
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { useState } from '@hookstate/core';
import globalState from "../../global.state";


const sortOptions = [
    {label: 'по падению цены', value: '!price'},
    {label: 'по росту цены', value: 'price'},
];


export default function Tovars({useClick}) {
    const products = useState(globalState.tovars);
    const [layout, setLayout] = React.useState('grid');
    const [sortKey, setSortKey] = React.useState(null);
    const [sortOrder, setSortOrder] = React.useState(null);
    const [sortField, setSortField] = React.useState(null);

    
    const onSortChange =(event)=> {
        const value = event.value;

        if(value.indexOf('!')===0){
            setSortOrder(-1);
            setSortField(value.substring(1, value.length));
            setSortKey(value);
        }
        else {
            setSortOrder(1);
            setSortField(value);
            setSortKey(value);
        }
    }
    const renderListItem =(data)=> {
        return(
            <div className="p-col-12">
                <div className="product-list-item">
                    <img  src={data.images[0]} alt={data.name} />
                    <div className="product-list-detail">
                        <div className="product-name">
                            { data.name }
                        </div>
                        <div className="product-description">
                            { data.description }
                        </div>
                        <i className="pi pi-tag product-category-icon"></i>
                        <span className="product-category">{data.category}</span>
                    </div>
                    <div className="product-list-action">
                        <span className="product-price">
                            <span style={{color:"red"}}>{data.price}</span>
                            /
                            <span style={{color:"green"}}>{data.priceMin} грн</span>
                        </span>
                        <Button 
                            onClick={()=> useClick(data)}
                            icon="pi pi-shopping-cart" 
                            label="В корзину" 
                        />
                    </div>
                </div>
            </div>
        );
    }
    const renderGridItem =(data)=> {
        return(
            <div className="p-col-12 p-md-4">
                <div className="product-grid-item card">
                    <div className="product-grid-item-top">
                        <div>
                            <i className="pi pi-tag product-category-icon"></i>
                            <span className="product-category">
                                { data.model }
                            </span>
                        </div>
                    </div>
                    <div className="product-grid-item-content">
                        <img 
                            src={data.images[0]} 
                            alt={data.name} 
                        />
                        <div className="product-name">
                            { data.name }
                        </div>
                        <div className="product-description">
                            { data.description }
                        </div>
                    </div>
                    <div className="product-grid-item-bottom">
                        <span className="product-price">
                            <span style={{color:"red"}}>{data.price}</span>
                            /
                            <span style={{color:"green"}}>{data.priceMin} грн</span>
                        </span>
                        <Button 
                            onClick={()=> useClick(data)}
                            icon="pi pi-shopping-cart" 
                            label="В корзину" 
                        />
                    </div>
                </div>
            </div>
        );
    }
    const itemTemplate =(product, layout)=> {
        if(!product) return;
        if(layout==='list') return renderListItem(product);
        else if(layout==='grid') return renderGridItem(product);
    }
    const renderHeader =()=> {
        return(
            <div className="p-grid p-nogutter">
                <div className="p-col-6" style={{textAlign: 'left'}}>
                    <Dropdown 
                        options={sortOptions} 
                        value={sortKey} 
                        optionLabel="label" 
                        placeholder="Сортировка" 
                        onChange={onSortChange}
                    />
                </div>
                <div className="p-col-6" style={{textAlign: 'right'}}>
                    <DataViewLayoutOptions 
                        layout={layout} 
                        onChange={(e)=> setLayout(e.value)}
                    />
                </div>
            </div>
        );
    }


    return(
        <div className="dataview-demo">
            <DataView paginator 
                value={products.get()} 
                layout={layout} 
                header={renderHeader()}
                itemTemplate={itemTemplate} 
                rows={9}
                sortOrder={sortOrder}
                sortField={sortField} 
            />
        </div>
    );
}