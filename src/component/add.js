import React, { useState, useEffect } from "react";
import { Button, Input } from '@nextui-org/react';
import Select from 'react-select';
import { useSend, fileLoader } from "./engine";
import Files from "react-files";


const options = [
    { value: 'plintus', label: 'Плинтуса' },
    { value: 'detail-plintus', label: 'Фурнитура к плинтусам' },
    { value: 'door-profile', label: 'Дверные профиля' },
    { value: 'fyrnityra', label: 'Фурнитура' },
    { value: 'shadow-profile', label: 'Профиля теневого шва' }
]


/** 
 * создатель товаров
 */
export default function Add(props) {
    const [prev, setPrev] = useState()
    const [files, setFiles] = useState([])
    const [state, setState] = useState([])
    const [type, setType] = useState("не выбрано")

    const save =(index, value)=> {
        state[index] = value
        setState(state)
    }
    const onSend =()=> {
        useSend("create", {files:files,state:state,type:type})
    }
    const onFile =(filess)=> {
        let filesCopy = files
        setPrev(filess)

        filess.forEach((element, index)=> {
            fileLoader(element, (data)=> {filesCopy[index] = data; setFiles(filesCopy);})
        });
    }

    return(
        <div className="Form">
            <div className="files">
                {prev?prev.map((f, i)=> <img key={i} width="70px" src={f.preview.url}/>):""}
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
            <var>категория</var>
            <Select placeholder={type} onChange={(e)=> setType(e.value)} options={options} value={type}/>
            <Button 
                onClick={onSend} 
                className="button"
            > 
                создать товарную позицию 
            </Button>
        </div>
    );
}