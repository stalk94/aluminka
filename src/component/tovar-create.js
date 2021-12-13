const Form = JSONSchemaForm.default;
const adminForms = globalThis.__$schemes__.admin



export function PhotoLoader(props) {
    const [images, setReload] = React.useState(props.images)
    const inputRef = React.useRef(null)

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
        <label style={{cursor:"pointer"}} className="custom-file-upload">
            <div style={{display:"flex",flexDirection:"row",width:"100%",height:"30%",textAlight:"centr",border:"1px dotted red"}}>
                {props.images.length < 1 
                    ? <var style={{marginLeft:"35%", marginTop:"5%",color:"gray"}}>
                        Для загрузки фото, нажмите на область
                    </var>
                    : '' 
                }
                {images.map((img, i)=> (
                    <div key={i}>
                        <div className="btn-del" onClick={(e)=> useDelete(i, e)}>
                            <img src={'../src/img/delete.png'}/>
                        </div>
                        <img className="photos" 
                            src={img} 
                            style={{width:(window.innerWidth/props.images.length)+"px",height:"100%"}}
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
    const [images, setImages] = React.useState([])

    const usePhoto =(e)=> images.length<=4 && setImages(e)

    
    return(
        <React.Fragment>
            <PhotoLoader images={images} setImages={usePhoto} />
            <Form formData={formData}
                schema={adminForms[0]}
                onChange={(e)=> setFormData(e.formData)}
                onError={(e)=> useEmit('error', e)} 
            >
                <Form formData={formData}
                    schema={adminForms[1]}
                    onChange={(e)=> setFormData(e.formData)}
                    onError={(e)=> useEmit('error', e)} 
                >
                    <Form formData={formData}
                        schema={adminForms[2]}
                        onChange={(e)=> setFormData(e.formData)}
                        onSubmit={(e)=> useEmit('create', {...formData, images:images})}
                        onError={(e)=> useEmit('error', e)} 
                    >
                        <button style={{cursor:"pointer"}}> 
                            { props.title } 
                        </button>
                    </Form>
                </Form>
            </Form>
        </React.Fragment>
    );
}