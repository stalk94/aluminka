import React, { useState, useEffect } from "react";
import Page from "./page";



const Tovar =(props)=> (
    <div className="list-tovar">
        <div className="tovar-cart line">
            <svg onClick={()=> props.openEditor(props.index)} 
                className="Edit" 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 20 20"
                style={{visibility:$permisions.download?"visible":"hidden"}}
            >
                <path fill="#36c" d="M16.77 8l1.94-2a1 1 0 0 0 0-1.41l-3.34-3.3a1 1 0 0 0-1.41 0L12 3.23zm-5.81-3.71L1 14.25V19h4.75l9.96-9.96-4.75-4.75z"/>
            </svg>
            <img className="tovar-img" src={props.src} />
            <div className="tovar-right">
                <div className="p-1 opisanie-div info">
                    { props.name }
                </div>
                <div className="line">
                    <div className="column price" style={{marginTop:"2%"}}>
                        <div className="price-old info">{ props.price }₴</div>
                        <div className="price-new info">{ props.minPrice }₴</div>
                    </div>
                    <div className="column" style={{flex:"1",marginTop:"2%",paddingLeft:"15%"}}>
                        <div className="fiolet-button" 
                            id="sell" 
                            style={{height:"65%",marginBottom:"2%"}}
                            onClick={()=> props.click(props)}
                        > 
                            Купить 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);


export default function ListTovar(props) {
    const [data, setData] = useState(props.states, [])
    const [open, setOpen] = useState(false)
    const [view, setView] = useState("nav")
    
    useEffect(()=> setData(props.states), [props.states])

    return(
        <>
            {view==="nav"
                ? (data.length > 0 ? data.map((tovar, index)=> (
                    <Tovar
                        key={index} 
                        index={index}
                        src={tovar[0][0]} 
                        name={tovar[1]} 
                        price={tovar[12]} 
                        minPrice={tovar[13]} 
                        click={()=> setView(index)}
                        openEditor={(ind)=> {
                            setOpen(data[ind]);
                            indexOpen = ind;
                        }}
                    />
                )) : <var> Пока товаров нет </var>)
                : <Page 
                    images={data[view][0]}
                    name={data[view][1]}
                    id={data[view][2]}
                    model={data[view][3]}
                    price={data[view][12]}
                    priceMin={data[view][13]}
                    description={data[view][5]}
                    material={data[view][6]}
                    dop={data[view][7]}
                    width={data[view][8]}
                    vusota={data[view][9]}
                    height={data[view][10]}
                    colors={data[view][11]}
                    onEnd={()=> setView("nav")}
                />
            }
        </>
    );
}