import React from 'react';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';




export const Feedback =()=> {
    const [value, setValue] = React.useState();
    const [state, setState] = React.useState([]);

    const useState =(val, index)=> {
        let copy = state
        copy[index] = val
        setState(copy)
    }
    const useSend =()=> {
        if(state[2].length > 10) send("question", {
            name: state[0],
            email: state[1],
            text: state[2]
        }, "POST", (res)=> {
            if(res.error) EVENT.emit("error", res.error);
            else EVENT.emit("sucess", res.sucess);
        });
        else EVENT.emit("error", "сообщение должно быть длинее 10 символов")
    }


    return(
        <section style={{backgroundColor:"#151616"}}>
            <div style={{paddingLeft:"40%"}}>
                <h2 style={{paddingLeft:"1%"}}>
                    Остались вопросы?
                </h2>
                <div style={{display:"flex",flexDirection:"column"}}>
                    <InputText style={{width:"35%",marginBottom:"5px"}} 
                        placeholder='Ваше имя'
                        type='text' 
                        value={state[0]} 
                        onChange={(e)=> useState(e.target.value, 0)} 
                    />
                    <InputText style={{width:"35%",marginBottom:"5px"}} 
                        placeholder='Ваш email' 
                        type='email' 
                        value={state[1]} 
                        onChange={(e)=> useState(e.target.value, 1)} 
                    />
                    <InputTextarea 
                        style={{width:"35%",marginBottom:"15px"}}
                        placeholder='Ваш вопрос'
                        rows={5} 
                        cols={10} 
                        value={value} 
                        onChange={(e)=> setValue(e.target.value)} 
                    />
                    <Button 
                        style={{width:"20%",marginBottom:"15px"}}
                        label="Отправить" 
                        className="p-button-raised p-button-outlined" 
                        onClick={useSend}
                    />
                </div>
            </div>
        </section>
    );
}


export default function Footer(props) {
    return(
        <>
            <section className="line">
                <ul className="column">
                    <li>Контакты</li>
                    <li>Возврат товара</li>
                    <li>Условия и договор</li>
                </ul>
                <ul className="column" style={{marginLeft:"20%"}}>
                    <li>Каталог</li>
                    <li>Производители</li>
                    <li>Акции</li>
                </ul>
            </section>
            <section style={{backgroundColor:"black",textAlign:"center"}}>
                ТОВ Алюминка - производство алюминиевых профилей © 2021
            </section>
        </>
    );
}