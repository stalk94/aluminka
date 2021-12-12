import React, { useState, useEffect, useRef } from "react";
import { RiDeleteBin2Line } from "react-icons/ri";
import { Button } from '@nextui-org/react';
import OffCanvas from "react-aria-offcanvas";
import { sends, fileLoader } from "./engine"
import Files from "react-files";
import "image-to-base64"



const style = {
    marginLeft: "5px",
    width: "95%"
}
const useSend =(path, data, clb)=> {
    sends(path, {
        login:store.get("user").login,
        password:store.get("user").password,
        state: data.state,
        type: data.type,
        id: data.id
    }, "POST", clb)
}


const ReImage =(props)=> (
    <div>
        <div onClick={props.useClick} style={{position:"absolute",cursor:"pointer",zIndex:99999,color:"red"}}>
            <RiDeleteBin2Line/>
        </div>
        <img className="RedactImage" width="70px" src={props.src}/>
    </div>   
);



export function EditList(props) {
    const [state, setState] = useState(props.open)
    const [files, setFiles] = useState(props.open[0]??[])

    const onSaveData =()=> {
        let sdata = state
        sdata[0] = files

        if(state) useSend("edit", {
            type: props.url,
            state: sdata,
            id: props.index
        }, (data)=> {
            if(data && !data.error){
                EVENT.emit("sucess", `${data[1]} completed`)
                setState(data)
                setFiles(data[0])
                props.useOpen(data)
            }
            else EVENT.emit("error", `${data.error}`)
            console.log("save")
        });
        else EVENT.emit("error", `[EditList]: state false`)
    }
    const change =(val, index)=> {
        let stat = state
        stat[index] = val
        setState(stat)
    }
    const onFile =(fileLoad)=> {
        let filesCopy = files
        let st = state

        fileLoad.forEach((file, i)=> {
            fileLoader(file, (data)=> {
                filesCopy[i] = data
                setFiles(filesCopy)
            })
        })
        setFiles(filesCopy)
        st[0] = filesCopy
        setState(st)
    }
    const onDel =(index)=> {
        let stat = state
        setFiles(files.splice(index, 1))
        stat[0] = files
        setState(stat)
    }

    useEffect(()=> {
        setState(props.open)
        if(props.open) setFiles(props.open[0])
    }, [])
    

    return(
        <OffCanvas
            className="offCanvas"
            height="100%"
            position="right"
            isOpen={state===false?false:true}
            onClose={()=> props.useOpen(false)}
            labelledby="menu-button"
        >
            <div className="Editor">
                <div style={{display:"flex",flexDirection:"row"}} className="files">
                    {files.map((file, index)=> (
                        <ReImage 
                            key={new Date().getTime()&&index} 
                            src={file}
                            useClick={()=> onDel(index)}
                        />
                    ))}
                    <Files
                        className='files-dropzone'
                        onChange={onFile}
                        onError={console.log}
                        accepts={['image/*']}
                        multiple
                        maxFiles={4}
                        maxFileSize={10000000}
                        minFileSize={0}
                        clickable
                    >
                        <var style={{textAlign:"center"}}>фото товара(max 4)</var>
                    </Files>
                </div>
                имя:
                <input style={style} name="name" type="text" onChange={(e)=>change(e.target.value, 1)} defaultValue={state[1]}/>
                модель:
                <input style={style} name="model" type="text" onChange={(e)=>change(e.target.value, 3)} defaultValue={state[3]}/>
                цена:
                <input style={style} name="price" type="text" onChange={(e)=>change(e.target.value, 12)} defaultValue={state[12]}/>
                цена акционная:
                <input style={style} name="priceMin" type="text" onChange={(e)=>change(e.target.value, 13)} defaultValue={state[13]}/>
                описание:
                <input style={style} name="description" type="text" onChange={(e)=>change(e.target.value, 5)} defaultValue={state[5]}/>
                материал:
                <input style={style} name="material" type="text" onChange={(e)=>change(e.target.value, 6)} defaultValue={state[6]}/>
                цирина:
                <input style={style} name="width" type="text" onChange={(e)=>change(e.target.value, 8)} defaultValue={state[8]}/>
                длинна:
                <input style={style} name="vusota" type="text" onChange={(e)=>change(e.target.value, 9)} defaultValue={state[9]}/>
                высота:
                <input style={style} name="height" type="text" onChange={(e)=>change(e.target.value, 10)} defaultValue={state[10]}/>
                дополнительно:
                <input style={style} name="dop" type="text" onChange={(e)=>change(e.target.value, 7)} defaultValue={state[7]}/>
                цвета(через запятую)
                <input style={style} name="color" type="text" onChange={(e)=>change(e.target.value, 11)} defaultValue={state[11]}/>
            </div>
            <div style={{display:"flex", flexDirection:"row", marginTop:"20px"}}>
                <Button 
                    color="success" 
                    size="small" 
                    onClick={onSaveData}
                > 
                    Применить 
                </Button>
                <Button color="error" size="small" onClick={()=> props.useOpen(false)}>Закрыть</Button>
            </div>
        </OffCanvas>
    );
}