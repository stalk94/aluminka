import React from "react";




export default function Slider(props) {
    const useChange =(e)=> {
        console.log(e)
    }
    const useClickItem =(e)=> {
        console.log(e)
    }

    return(
       
            {props.data.map((img, id)=> <img key={id} src={img}/>)}
        </Carousel>
    )
}