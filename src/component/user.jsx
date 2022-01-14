import React from "react";
import { FaUserEdit, FaUserCog } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { Tabs } from '@mantine/core';
import { ImExit } from "react-icons/im";
import Form from "@rjsf/core";
import { Button } from '@mantine/core';
import globalState from "../global.state";


const UserEdit =(props)=> {
    const style = {display:"flex",marginTop:"25.3%",flexDirection:"row",background:"#000000cc",height:"40px"}
    const [formData, setFormData] = React.useState(null);

    return(
        <div>
            <Form
                formData={formData}
                schema={globalState.user.get()}
                onChange={(e)=> setFormData(e.formData)}
                onError={(e)=> useEmit('error', e)} 
            >
                <Button style={{margin:"20px"}} color="sucess" onClick={()=> EVENT.emit("user.edit", formData)}> 
                    сохранить 
                </Button>
            </Form>
            <div style={style}>

            </div>
        </div>
    );
}
const Catalog =(props)=> {
    return(
        <>
            {globalState.user.bays.get().map((bay, i)=> {
                <div>
                    <var>{bay.time}</var>
                    <var>{bay.total}</var>
                    <var>{bay.status}</var>
                </div>
            })}
        </>
    );
}



export default function User({visible, setOpen}) {
    const [activ, setActiv] = React.useState('edit');
    const [state, setState] = React.useState();

    React.useEffect(()=> {
        if(globalThis.$state) setState(globalThis.$state.user)
    }, [])
    const useExit =()=> {
        EVENT.emit("close.modal", '')
    }
    const onChange =(i)=> {
        if(i===0) setActiv('edit')
        else if(i===1) setActiv('catalog')
        else setActiv('setings')
    }

    return(
        <div style={{display:visible?"block":"none"}}>
            <div style={{backgroundColor:"#545454"}}>
                <Tabs onTabChange={onChange}>
                    <Tabs.Tab style={{color:"white"}} icon={<FaUserEdit className="user-exit" />}/>
                    <Tabs.Tab style={{color:"white"}} icon={<FiShoppingBag className="user-exit" />}/>
                    <Tabs.Tab style={{color:"white"}} icon={<FaUserCog className="user-exit" />}/>
                </Tabs>
                <div className="user-exit" style={{position:"absolute",zIndex:3,top:"10px",left:"96%"}} onClick={useExit}>
                    <ImExit/>
                </div>
            </div>
            {activ==='edit'
                ? <UserEdit />
                : (activ==='catalog'
                    ? <Catalog />
                    : <div>в разработке</div>
                )
            }
        </div>
    );
}