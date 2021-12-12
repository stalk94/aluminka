import React from 'react';
import 'devextreme/dist/css/dx.light.css';
import Gallery from 'devextreme-react/gallery';
import ResponsiveBox, { Row, Col, Item, Location } from 'devextreme-react/responsive-box';
import ReactDOM from 'react-dom';


const Box =()=> {
    return(
        <ResponsiveBox>
            <Row ratio={1}>
                <div>xro</div>
            </Row>
            <Row ratio={2} shrink={2}/>
            <Row ratio={0.7}/>
            <Col ratio={0.5} shrink={0.5}/>
            <Col ratio={2} screen="md lg"/>
            <Col ratio={0.5} screen="md lg"/>
        </ResponsiveBox>
    );
}


export const Galery =(props)=> {
    return(
        <Gallery
            id="gallery"
            dataSource={props.data}
            height={300}
            loop={false}
            showNavButtons={props.showBtn}
            showIndicator={false} 
        />
    );
}



ReactDOM.render(<Box showBtn={false} />, document.querySelector(".test"))