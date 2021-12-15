import React from 'react';
import ListTovar from "./page/list-tovar";



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
            {$state.tovar.length > 0 
                ? <ListTovar states={$state.tovar} /> 
                : <var>товаров пока нет</var> 
            }
        </div>     
    );
}