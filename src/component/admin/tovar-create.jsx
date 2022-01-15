import React from 'react';
import Form from "@rjsf/core";
import { Button } from "../base";
import globalState from "../../global.state";


export function PhotoLoader(props) {
    const inputRef = React.useRef(null)
    const [images, setReload] = React.useState(props.images)

    const useDelete =(index, e)=> {
        let files = [...props.images]
        files.splice(index, 1)
        props.setImages(files);
        e.preventDefault()
    }
    const onLoad =(e)=> {
        useReadFile(e.target, (data)=> {
            props.setImages([...props.images, data])
        });
    }
    React.useEffect(()=> setReload(props.images), [props.images])


    return(
        <label style={{cursor:"pointer",maxHeight:"30%"}} className="custom-file-upload">
            <div style={{display:"flex",flexDirection:"row",maxHeight:"30%",textAlight:"centr",border:"1px dotted red"}}>
                {props.images.length < 1 
                    ? <var style={{marginLeft:"35%", marginTop:"5%",color:"gray"}}>
                        Для загрузки фото, нажмите на область
                    </var>
                    : '' 
                }
                {images.map((img, i)=> (
                    <div key={i}>
                        <div className="btn-del" onClick={(e)=> useDelete(i, e)}>
                            <img src={'../img/delete.png'}/>
                        </div>
                        <img className="photos" 
                            height="150px"
                            src={img} 
                            style={{maxWidth:(window.innerWidth/props.images.length)+"px"}}
                        />
                    </div>
                ))}
                <input ref={inputRef} onChange={onLoad} type="file" style={{display:"none"}}/>
            </div>
        </label>
    );
}




export function AdminFormCreate(props) {
    const [formData, setFormData] = React.useState(null);
    const [images, setImages] = React.useState([]);


    return(
        <div style={{height:window.innerHeight-50,overflowY:"auto"}}>
            <PhotoLoader images={images} setImages={(e)=> images.length<=6 && setImages(e)} />
            <Form
                formData={formData}
                schema={globalState.schemes.admin.get()[0]}
                onChange={(e)=> setFormData(e.formData)}
                onError={(e)=> useEmit('error', e)} 
            >
                <Form formData={formData}
                    schema={globalState.schemes.admin.get()[1]}
                    onChange={(e)=> setFormData(e.formData)}
                    onError={(e)=> useEmit('error', e)} 
                >
                    <Form formData={formData}
                        schema={globalState.schemes.admin.get()[2]}
                        onChange={(e)=> setFormData(e.formData)}
                        onSubmit={(e)=> useEmit('create', {...formData, images:images})}
                        onError={(e)=> useEmit('error', e)} 
                    >
                        <div></div>
                    </Form>
                </Form>
            </Form>
            
            <Button color="sucess" onClick={()=> EVENT.emit("create.tovar", {...formData, images:images})}> 
                { props.title??'сохранить' } 
            </Button>
        </div>
    );
}