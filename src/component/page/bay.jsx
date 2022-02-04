import React from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import OffCanvas from "react-aria-offcanvas";
import Select from 'react-select';
import { useDidMount } from "rooks";
import { useState } from '@hookstate/core';
import globalState from "../../global.state";



const Pays =({onOpen, setOpen})=> {
    const [state, setState] = React.useState({
        firstName: globalState.user.firstName.get(),
        lastName: globalState.user.lastName.get(),
        phone: globalState.user.phone.get(),
        city: globalState.user.city.get(),
        adres: globalState.user.adres.get()
    });
    const [type, setType] = React.useState();
    const [typePay, setTypePay] = React.useState();


    const onSell =()=> {
        EVENT.emit("newBay", {
            basket: globalState.user.basket.get(), 
            total: total, 
            delivery: type,
            target: state
        });
    }
    const onState =(name, value)=> {
        let copy = state
        copy[name] = value
        setState(copy)
    }


    return(
        <OffCanvas
            labelledby="Доставка"
            height="100%"
            position="right"
            isOpen={onOpen}
            onClose={()=> setOpen(onOpen ? false : true)}
            labelledby="menu-button"
        >
            <div className="delivery">
                <span className="p-float-label">
                    <InputText id="inn" value={state.firstName} onChange={(e)=> onState("firstName", e.target.value)} />
                    <label htmlFor="inn">Имя</label>
                </span>
                <span className="p-float-label">
                    <InputText id="inl" value={state.lastName} onChange={(e)=> onState("lastName", e.target.value)} />
                    <label htmlFor="inl">Фамилия</label>
                </span>
                <span className="p-float-label">
                    <InputText id="inp" value={state.phone} onChange={(e)=> onState("phone", e.target.value)} />
                    <label htmlFor="inp">Телефон</label>
                </span>
                <span className="p-float-label">
                    <InputText id="inc" value={state.city} onChange={(e)=> onState("city", e.target.value)} />
                    <label htmlFor="inc">Город</label>
                </span>

                <Select 
                    placeholder={type} 
                    onChange={(e)=> setType(e.value)} 
                    options={globalState.schemes.delivery.get()} 
                    value={type}
                />
                <Select 
                    placeholder={typePay} 
                    onChange={(e)=> setTypePay(e.value)} 
                    options={globalState.schemes.pays.get()} 
                    value={typePay}
                />
                <InputText
                    placeholder={type==="nov" ? "отделение" : "адресс"} 
                    onChange={(e)=> onState(type, e.value)} 
                    value={type==="nov" ? "" : state.adres}
                />
                <Button label="Оформить" onClick={onSell}/> 
            </div>
        </OffCanvas>
    );
}


export function PanelBays() {
    const [pays, setPays] = React.useState(false);
    const [view, setView] = React.useState(false);
    const [isOpen, setOpen] = React.useState(false);
    const basket = useState(globalState.user.basket);


    const total =()=> {
        let tot = {news:0, old:0};
        if(basket.forEach) basket.forEach((data, i)=> {
            let old = data.tovar.price
            let news = data.tovar.priceMin
            tot.old += old*data.count
            tot.news += news*data.count
        });
        return tot;
    }
    const useViewClick =()=> {
        setPays(<Pays total={total().news} setOpen={setView} onOpen={view} />)
    }
    useDidMount(()=> {
        EVENT.on("bay.open", (val)=> {
            setOpen(val)
        });
        EVENT.on("add", (data)=> {
            basket.set((st)=> {
                st.push(data)
                return st
            });
        });
    });


    return(
        <>
            { pays }
            <OffCanvas
                labelledby="Корзина"
                height="100%"
                position="right"
                isOpen={isOpen}
                onClose={()=> setOpen(isOpen?false:true)}
                labelledby="menu-button"
            >
                <Button label='К странице' style={{color:"white"}} onClick={()=> setOpen(false)}/>
                
                <div style={{marginTop:"5%"}}>
                    {(basket.length > 0) && basket.map((val, index)=> (
                        <div style={{display:"flex",flexDirection:"row"}} key={index}>
                            <img width="30%" src={val.tovar.images[0]} style={{maxHeight:"80px"}}/>
                            <div style={{marginTop:"5%",color:"black"}}>{ val.tovar.name }</div>
                            <h5>{ val.count }</h5>
                            <h5>{ val.tovar.priceMin * val.count }₴</h5>
                            <h4 style={{marginTop:"5%",color:"red"}}> x </h4>
                        </div>
                    ))}
                </div>
                {basket.length > 0 
                    ? <Button label='Офрмить покупку' onClick={useViewClick}/> 
                    : <var> Корзина пуста </var>
                }
                <div style={{marginTop:"5%",display:"flex",flexDirection:"row"}}> Всего: 
                    <div style={{textDecoration:"line-through",color:"red"}}>{ total().old }₴</div>
                        / 
                    <div style={{color:"green"}}>{ total().news }₴</div>
                </div>
            </OffCanvas>
        </>
    );
}