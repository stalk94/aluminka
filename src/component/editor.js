import React, { useState, useEffect } from "react";
import { RiDeleteBin2Line } from "react-icons/ri";
import { Button } from '@nextui-org/react';
import OffCanvas from "react-aria-offcanvas";
import { sends, fileLoader } from "./engine"
import Files from "react-files";


const style = {
    marginLeft: "5px",
    width: "95%"
}
const useSend =(path, data, clb)=> {
    sends(path, {
        login:store.get("login"),
        password:store.get("password"),
        state: data.state,
        type: data.type,
        id: data.id
    }, "POST", clb)
}


const ReImage =(props)=> (
    <div>
        <div onClick={props.useClick} style={{position:"absolute",cursor:"pointer",zIndex:99999}}>
            <RiDeleteBin2Line/>
        </div>
        <img width="70px" src={props.src}/>
    </div>   
);



export function EditList(props) {
    const [state, setState] = useState(false)
    const change =(val, index)=> {
        console.log(val)
        state[index] = val
        setState(state)
    }
    const onSaveData =(res)=> {
        store.set(props.url, res)
        props.useOpen(res[props.index])
    }
    const onFile =(filess)=> {
        let stat = state;

        filess.forEach((element, index)=> {
            fileLoader(element, (data)=> {
                stat[0][index] = data
            })
        });
        setState(stat)
        props.useOpen(stat)
    }
    const onDel =(id)=> {
        let stat = state
        stat[0] = stat[0].splice(id, id)
        setState(stat)
        props.useOpen(stat)
    }

    useEffect(()=> {
        setState(props.open)
    }, [props.open])
    

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
                <div className="files">
                    {state && state[0]
                        ? state[0].map((f, i)=> <ReImage key={i} src={f} useClick={()=>onDel(i)}/>)
                        : ""
                    }
                    <Files
                        className='files-dropzone'
                        onChange={(e)=> onFile(e)}
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
                <Button color="success" size="small" onClick={()=>useSend("edit",{type:props.url,state:state,id:props.index},(data)=>onSaveData(data))}>Применить</Button>
                <Button color="error" size="small" onClick={()=> props.useOpen(false)}>Закрыть</Button>
            </div>
        </OffCanvas>
    );
}