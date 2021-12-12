import React, { useState, useEffect } from "react";
import { Input } from '@nextui-org/react';
import { useSend, fileLoader } from "./engine";
import ReactDOM from "react-dom";
import Files from "react-files";
import "image-to-base64"


export default function Add(props) {
    const [prev, setPrev] = useState()
    const [files, setFiles] = useState([])
    const [state, setState] = useState([])
    const [type, setType] = useState(document.body.getAttribute("root"))

    const save =(index, value)=> {
        state[index] = value
        setState(state)
    }
    const verify =()=> {
        let rezult = true
        state.forEach((e, i)=> {
            if(e[i].length < 4){
                EVENT.emit("error", `в поле ${i} менее 4х символов заполнено`)
                rezult = false
            }
        })
        return rezult
    }
    const onSend =()=> {
        let user = store.get("user")

        useSend("create", {
            login: user.login,
            password: user.password,
            files: files,
            state: state,
            type: type
        }, (res)=> {
            if(!res.error) EVENT.emit("sucess", `${state[0]} create`) 
            else EVENT.emit("error", `${res.error}`)
        });
    }
    const onFile =(fileLoad)=> {
        let filesCopy = files
        setPrev(fileLoad)

        fileLoad.forEach((element, index)=> {
            fileLoader(element, (data)=> {
                filesCopy[index] = data 
                setFiles(filesCopy)
            })
        });
    }

    
    return(
        <>
            <img id="exit-admin" 
                width="50px" 
                src="https://icons.iconarchive.com/icons/hopstarter/sleek-xp-basic/256/Close-2-icon.png"
                onClick={()=> document.querySelector(".Admin-add").style.display="none"}
                style={{zIndex:"9999999999"}}
            />
            <div className="Form">
                <div className="files">
                    {prev?prev.map((f, i)=> <img key={i} width="70px" src={f.preview.url}/>):""}
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
                <Input className="wrap" labelPlaceholder="имя товара" onChange={(e)=> save(0, e.target.value)} value={state[0]}/>
                <var>свойства:</var>
                <Input className="wrap" labelPlaceholder="код товара" onChange={(e)=> save(1, e.target.value)}  value={state[1]}/>
                <Input className="wrap" labelPlaceholder="модель" onChange={(e)=> save(2, e.target.value)}  value={state[2]}/>
                <Input className="wrap" labelPlaceholder="цвет(через запятую)" onChange={(e)=> save(3, e.target.value)}  value={state[3]}/>
                <Input className="wrap" labelPlaceholder="описание" onChange={(e)=> save(4, e.target.value)}  value={state[4]}/>
                <var>характеристики:</var>
                <Input className="wrap" labelPlaceholder="материал" onChange={(e)=> save(5, e.target.value)}  value={state[5]}/>
                <Input className="wrap" labelPlaceholder="покрытие" onChange={(e)=> save(6, e.target.value)}  value={state[6]}/>
                <Input className="wrap" labelPlaceholder="ширина" onChange={(e)=> save(7, e.target.value)}  value={state[7]}/>
                <Input className="wrap" labelPlaceholder="высота" onChange={(e)=> save(8, e.target.value)}  value={state[8]}/>
                <Input className="wrap" labelPlaceholder="длинна" onChange={(e)=> save(9, e.target.value)}  value={state[9]}/>
                <Input className="wrap" labelPlaceholder="дополнительная информация" onChange={(e)=> save(10, e.target.value)}  value={state[10]}/>
                <Input className="wrap" labelPlaceholder="цена" onChange={(e)=> save(11, e.target.value)}  value={state[11]}/>
                <Input className="wrap" labelPlaceholder="цена акционная" onChange={(e)=> save(12, e.target.value)}  value={state[12]}/>
                
                <h5>Категория: {document.body.getAttribute("root")}</h5>
                <button 
                    onClick={()=> onSend()} 
                    className="button"
                    style={{backgroundColor:"#61a7e0", width:"80%", border:"1px solid blue", color:"red"}}
                > 
                    создать товарную позицию 
                </button>
            </div>
        </>
    );
}


ReactDOM.render(<Add />, document.querySelector(".Admin-add"))