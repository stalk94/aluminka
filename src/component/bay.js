import React, { useState, useEffect } from 'react';
import { Button, Input } from '@nextui-org/react';
import { useSend } from "./engine";
import OffCanvas from "react-aria-offcanvas";
import Select from 'react-select';



const options = [{value: 'nov', label: 'Новой почтой'}, {value: 'samo', label: 'Самовывоз'}]
const options2 = [{value: 'naloj', label: 'Наложенный платеж'}]
let init = false
let user = store.get("user")
const stat = {
    name: user.name?user.name:"",
    familua: user.familua?user.familua:"",
    phone: user.phone?user.phone:"",
    city: user.city?user.city:"",
    adres: user.adres?user.adres:""
}


export const Pays =(props)=> {
    const [state, setState] = useState(stat)
    const [type, setType] = useState()
    const [typePay, setTypePay] = useState()

    const onSell =()=> {
        //if(typePay==="cart") useSend("payCart", {...state, total:total, delivery:type, bays:bays}, (data)=> data)
        useSend("new", {...state, total:total, bays:bays, delivery:type}, (data)=> data)
    }
    const onState =(name, value)=> {
        let copy = state
        copy[name] =  value
        setState(copy)
    }

    return(
        <OffCanvas
            labelledby="Доставка"
            height="100%"
            position="right"
            isOpen={props.onOpen}
            onClose={()=> props.setOpen(props.onOpen?false:true)}
            labelledby="menu-button"
        >
            <div className="delivery">
                <Input placeholder="имя" onChange={(e)=> onState("name",e.value)} value={state.name}/>
                <Input placeholder="фамилия" onChange={(e)=> onState("familua",e.value)} value={state.familua}/>
                <Input placeholder="номер телефона" onChange={(e)=> onState("phone",e.value)} value={state.phone}/>
                <Input placeholder="город" onChange={(e)=> onState("city",e.value)} value={state.city}/>
                <Select placeholder={type} onChange={(e)=> setType(e.value)} options={options} value={type}/>
                <Select placeholder={typePay} onChange={(e)=> setTypePay(e.value)} options={options2} value={typePay}/>
                <Input 
                    placeholder={type==="nov"?"отделение":"адресс"} 
                    onChange={(e)=> onState(type,e.value)} 
                    value={type==="nov"?"":state.adres}
                />
                <Button onClick={onSell}> Оформить </Button>
            </div>
        </OffCanvas>
    );
}


export function PanelBays(props) {
    const [view, setView] = useState(false)
    const [isOpen, setOpen] = useState(false)
    const [bays, setBays] = useState(store.get("bays")??[])

    const total =()=> {
        let tot = 0;
        bays.forEach((tovar, i)=> tot += tovar.tovar.priceMin*tovar.count);
        return tot;
    }
    useEffect(()=> {
        if(!init){
            EVENT.on("bay.open", (val)=> setOpen(val))
            EVENT.on("add", (data)=> {
                let bayse = store.get("bays")??[]
                bayse.push(data)
                
                store.set("bays", bayse)
                setBays(bayse)
            });
            init = true
        }
    }, [view, isOpen])


    return(
        <>
            <OffCanvas
                labelledby="Корзина"
                    height="100%"
                    position="right"
                    isOpen={isOpen}
                    onClose={()=> setOpen(isOpen?false:true)}
                    labelledby="menu-button"
                >
                    <Button style={{color:"white"}} flat color="blueviolet" auto onClick={()=> setOpen(false)}>
                        К странице
                    </Button>
                    <div style={{marginTop:"5%"}}>
                        {(bays.length > 0) && bays.map((val, index)=> (
                            <div style={{display:"flex",flexDirection:"row"}} key={index}>
                                <img width="30%" src={val.tovar.images[0]} style={{maxHeight:"80px"}}/>
                                <div style={{marginTop:"5%",color:"black"}}>{ val.tovar.name }</div>
                                <h5>{ val.count }</h5>
                                <h5>{ val.tovar.priceMin * val.count }₴</h5>
                                <h4 style={{marginTop:"5%",color:"red"}}> x </h4>
                            </div>
                        ))}
                    </div>
                    {bays.length > 0 
                        ? <Button onClick={()=> <Pays total={total()} setOpen={setView} onOpen={view} />}> Оформить Покупку </Button> 
                        : <var> корзина пуста </var>
                    }
                    <div style={{marginTop:"5%"}}> Всего: {total()}₴ </div>
                </OffCanvas>
        </>
    );
}