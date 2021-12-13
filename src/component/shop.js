import React, { useEffect, useState } from 'react';
import { send } from "./engine";
import { CCard,CCardBody,CCardImage,CCardText,CCardTitle, CRow, CCol } from "@coreui/react/dist/index";
import not from "../img/not-cart.png";



export const Cart =(props)=> (
    <CCard className="mb-3" 
        style={{maxWidth:(props.width??400)+'px'}} 
        id={props.id} 
        onClick={()=> props.onClick ? props.onClick(props.id) : ''}
    >
        <CRow className="g-0">
            <CCol md={4}>
                <CCardImage src={props.src ?? not} />
            </CCol>
            <CCol md={8}>
                <CCardBody>
                    <CCardTitle>{ props.title ?? 'none' }</CCardTitle>
                    <CCardText>
                        { props.children ?? 'none' }
                    </CCardText>
                    <CCardText>
                        <small className="text-medium-emphasis">{ props.footer ?? 'none' }</small>
                    </CCardText>
                </CCardBody>
            </CCol>
        </CRow>
    </CCard>
);


export default function Catalog(props) {
    const [data, setData] = useState([])
    const [curent, setCurent] = useState()

    useEffect(()=> {
        send("tovar", {dir:store.Nav}, "POST").then((data)=> {
            setData(data)
        });
    }, [])

    
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