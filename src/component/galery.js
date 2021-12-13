import React from 'react';
import 'devextreme/dist/css/dx.light.css';
import Gallery from 'devextreme-react/gallery';



export const Galery =(props)=> {
    return(
        <Gallery
            id="gallery"
            dataSource={props.data}
            height={props.height??300}
            loop={false}
            showNavButtons={props.showBtn}
            showIndicator={false} 
        />
    );
}