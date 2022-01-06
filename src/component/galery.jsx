import React from 'react';
import Gallery from 'devextreme-react/gallery';



export function PhotoGalery(props) {
    return(
        <Gallery
            id="gallery"
            dataSource={props.data}
            height={props.height??300}
            width={props.width}
            loop={false}
            showNavButtons={props.showBtn}
            showIndicator={props.showIndicator??false} 
        />
    );
}