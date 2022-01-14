import React, { useEffect, useState } from "react";
import { Title, Body, Footer, Button } from "./base";



/**
 *  ! Вызов через глобальный эммитер `"open.modal"`        
 *  `buttonTitle`: String == event name      
 *  `title`: String     
 *  `child`: JSX     
 *  `size`: 'sm' | 'lg' | 'xl' | ''     
 *  `tools`: JSX
 */
export default function Modal(props) {
    const [child, setChildren] = useState()
    const [title, setTitle] = useState('')
    const [btnTitle, setBtnTitle] = useState('click')
    const [size, setSize] = useState(null)
    const [visible, setVisible] = useState(props.visible??false);
    

    return(
        <div style={{position:'absolute',width:'100%',height:"100%",top:0,left:0,visibility:visible}}>
            <Title size={[15,80,5]}>
                <div style={{display:"flex",flexDirection:"row"}}>
                    { props.tools }
                </div>
                <div>{ title }</div>
                <Button color="danger" variant="outline" onClick={()=> EVENT.emit("close.modal", 'all')} >
                    x
                </Button>
            </Title>
            <Body>
                { child ?? props.children }
            </Body>
            <Footer>
                <Button color="danger" onClick={()=> setVisible(false)}>{ btnTitle??'Save' }</Button>
            </Footer>
        </div>
    );
}