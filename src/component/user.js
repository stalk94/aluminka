import React from "react";
import { FaUserEdit, FaUserCog } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { Tabs } from '@mantine/core';



export default function User() {
    const [state, setState] = React.useState()
    React.useEffect(()=> {
        if(globalThis.$state) setState(globalThis.$state.user)
    })

    return(
        <div style={{backgroundColor:"rgba(28,29,30,1)"}}>
            <Tabs>
                <Tabs.Tab style={{color:"white"}} icon={<FaUserEdit />}>
                    
                </Tabs.Tab>
                <Tabs.Tab style={{color:"white"}} icon={<FiShoppingBag />}>
                    
                </Tabs.Tab>
                <Tabs.Tab style={{color:"white"}} icon={<FaUserCog />}>
                    
                </Tabs.Tab>
            </Tabs>
        </div>
    );
}