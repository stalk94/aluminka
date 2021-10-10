import React, { useEffect, useState } from 'react';
import { send } from "./engine";




export default function Catalog(props) {
    const [data, setData] = useState([])
    const [curent, setCurent] = useState()

    useEffect(()=> {
        send("tovar", {dir:store.Nav}, "POST").then((data)=> {
            setData(data)
        });
    })

    return(
        <div className="swiper-containers">
            <div className="head-blok line">
                <div>Товары</div>
                {data.length>0 ? data.map((tovar, index)=> (
                    <Tovar 
                        key={index} 
                        name={tovar.name}
                        src={tovar.src}
                        data={tovar}
                        click={(cur)=> setCurent(cur)}
                        price={tovar.price}
                        minPrice={tovar.minPrice}
                    />
                )):"Товаров пока нет"}
            </div>
        </div>       
    );
}