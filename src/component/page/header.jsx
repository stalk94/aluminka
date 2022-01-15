import React from 'react';
import Navigation from "../page/navigation";
import Title from "../nav";
import fon from "../../img/top_fon.png";



export default function Header({useClickUrl,src}) {
    return(
        <header>
            <div>
                <Title/>
            </div>
            <div>
                <Navigation useClickUrl={useClickUrl} />
                <img style={{width:"100%",maxHeight:"400px",position:"relative",top:"-70px"}}
                    className="img-top" 
                    src={src??fon}
                />
            </div>
        </header>
    );
}