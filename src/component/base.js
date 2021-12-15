import React, { useEffect, useState } from "react";


const pallete = {
    primary: { 
        color: 'rgb(216, 219, 224)',   
        boxSizing: 'border-box',
        border: '1px solid rgb(216, 219, 224)',
        padding: '16px', 
        borderTopLeftRadius: '4px',
        borderTopRightRadius: '4px' 
    },
    secondary: {   
        color: '#9da5b1',  
        boxSizing: 'border-box',
        border: '#9da5b1',
        padding: '16px', 
        borderTopLeftRadius: '4px',
        borderTopRightRadius: '4px' 
    }, 
    success: {    
        color: '#2eb85c', 
        boxSizing: 'border-box',
        border: '1px solid #2eb85c',
        padding: '16px', 
        borderTopLeftRadius: '4px',
        borderTopRightRadius: '4px' 
    }, 
    danger: {    
        color: '#e55353',
        boxSizing: 'border-box',
        border: '1px solid #e55353',
        padding: '16px', 
        borderTopLeftRadius: '4px',
        borderTopRightRadius: '4px' 
    }, 
    warning: {    
        color: '#f9b115',
        boxSizing: 'border-box',
        border: '1px solid #f9b115',
        padding: '16px', 
        borderTopLeftRadius: '4px',
        borderTopRightRadius: '4px' 
    }, 
    light: {  
        color: 'white',  
        boxSizing: 'border-box',
        border: '1px solid white',
        padding: '16px', 
        borderTopLeftRadius: '4px',
        borderTopRightRadius: '4px' 
    }, 
    dark: {   
        color: 'black',  
        boxSizing: 'border-box',
        border: '1px solid black',
        padding: '16px', 
        borderTopLeftRadius: '4px',
        borderTopRightRadius: '4px' 
    }
};
const useColor =()=> {
    if(pallete[props.color]) return pallete[props.color]
    else return props.color
}


/**
 *  `bacground`: `color`     
 *  `size`: [5,80,15]
*/
export function Title(props) {
    const [child, setChild] = useState([])

    useEffect(()=> {
        setChild(props.size.map((size, i)=> {
            return(
                <div key={i} style={{width:`${size}%`}}>
                    { props.children[i] }
                </div>
            );
        }))
    }, [props])

    return(
        <div style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: props.background,
            height: "5%"
        }}>
            { child }
        </div>
    );
}
export function Body(props) {
    return(
        <div style={{overflowY:'auto'}}>
            { props.children }
        </div>
    )
}
export function Footer(props) {
    return(
        <footer>
            { props.children }
        </footer>
    )
}


/** color: "primary", "secondary", "success", "danger", "warning", "info", "light", "dark" */
export function Button(props) {
    const [opacity, setOpacity] = useState(1)

    return(
        <button
            onMouseEnter={()=> setOpacity(0.4)}
            onMouseLeave={()=> setOpacity(1)}
            style={{...pallete[props.color],backgroundColor:props.fill??'rgba(0,0,0,0)',cursor:'pointer',opacity:opacity,borderRadius:'5px'}} 
            onClick={props.onClick}
        >
            { props.children }
        </button> 
    );
}