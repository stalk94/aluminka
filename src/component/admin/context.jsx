import "primereact/resources/themes/md-dark-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import React from "react";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputSwitch } from 'primereact/inputswitch';


// Интерфейсы
export const Itext =({value,label,onChange})=> (
    <span className="p-float-label" style={{margin:"5px"}}>
        <InputText id="in" value={value} onChange={(e)=> onChange(e.target.value)} />
        <label htmlFor="in">{label}</label>
    </span>
);
export const Inumber =({value,label,onChange})=> (
    <span className="p-float-label" style={{margin:"5px"}}>
        <InputText id="in" value={value} onChange={(e)=> onChange(e.target.value)} />
        <label htmlFor="in">{label}</label>
    </span>
);
export const Iswitch =({value,label,onChange})=> (
    <div style={{display:"flex",flexDirection:"column",margin:"5px"}}>
        <InputSwitch style={{margin:"5px"}} checked={value} onChange={(e)=> onChange(e.value)} />
        <div style={{margin:"5px",color:"white",textDecoration:"underline"}}>{label}</div>
    </div>
);



/**
 * change: `function`   
 * cfg: [{`type:'text'||'number'||'switch'`,`value:any`, `label:string`}]   
 * style: {}
 */
export default function FormCart(props) {
    const [state, setState] = React.useState(props.cfg);
    const [view, setView] = React.useState([]);

    
    const useConfig =(stat)=> stat.map((conf, i)=> {
        if(conf.type==='text') return <Itext key={i} value={conf.value} label={conf.label} onChange={(v)=> useSetState(i, v)} />;
        else if(conf.type==='number') return <Inumber key={i} value={conf.value} label={conf.label} onChange={(v)=> useSetState(i, v)} />;
        else if(conf.type==='switch') return <Iswitch key={i} value={conf.value} label={conf.label} onChange={(v)=> useSetState(i, v)} />;
    });
    const useSetState =(i, v)=> {
        let st = props.cfg
        st[i].value = v
        setState(st)
        setView(useConfig(state))
    }
    React.useEffect(()=> setView(useConfig(state)), [props.cfg])

    
    return(
        <div style={{padding:"15px",width:"260px",backgroundColor:"#57575780",borderRadius:"5px",margin:"20px",...props.style}}>
            { view }
            <Button 
                className="p-button-success p-button-outlined"
                icon="pi pi-check"
                label="применить"
                style={{marginLeft:"20%",marginTop:"10px"}}
                onClick={()=> props.change(state)}
            />
        </div>
    );
}