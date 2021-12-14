import React, { useEffect, useState } from 'react';
import { CCard, CCardBody, CCardImage, CCardText, CCardTitle, CRow, CCol } from "@coreui/react/dist/index";




export function Carts(props) {
    const [image, setImage] = useState("")
    
    return(
        <CCard className="mb-3" 
            style={{maxWidth:(props.width??400)+'px'}} 
            id={props.id} 
            onClick={()=> props.onClick ? props.onClick(props.id) : setImage("img/not-cart.png")}
        >
            <CRow className="g-0">
                <CCol md={4}>
                    <CCardImage src={props.src??image} />
                </CCol>
                <CCol md={8}>
                    <CCardBody>
                        <CCardTitle>{ props.title??'none' }</CCardTitle>
                        <CCardText>
                            { props.children??'none' }
                        </CCardText>
                        <CCardText>
                            <small className="text-medium-emphasis">{ props.footer??'none' }</small>
                        </CCardText>
                    </CCardBody>
                </CCol>
            </CRow>
        </CCard>
    );
}


export function Catalog(props) {
    const [data, setData] = useState([])
    const [curent, setCurent] = useState()

    useEffect(()=> useSend("tovar", {dir: getRoot()}, "POST", (data)=> setData(data)), [])
    
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