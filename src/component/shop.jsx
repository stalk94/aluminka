import React from 'react';
import ListTovar from "./page/list-tovar";

if(getRoot()!=="index") document.querySelector(".top-img").style['margin-top'] = "-72px"

/**
    <Tovar 
        key={index} 
        name={tovar.name}
        src={tovar.src}
        data={tovar}
        click={(cur)=> setCurent(cur)}
        price={tovar.price}
        minPrice={tovar.minPrice}
    />
 */
export default function ShopController(props) {
    return(
        <div className="head-blok line">
            {globalThis.$tovar.length > 0 
                ? <ListTovar states={globalThis.$tovar} /> 
                : <var>товаров пока нет</var> 
            }
        </div>     
    );
}