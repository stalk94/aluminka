import React, { useEffect, useState } from "react";
import { AdminFormCreate } from "./tovar-create";
import FileManagers from "./file-manager";
import { Button, Title, Body, Footer } from "./base";
import { FcStatistics } from "react-icons/fc";
import { BiStoreAlt } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";


const Statstics =(props)=> {
    return(
        <div>

        </div>
    );
}
const Settings =(props)=> {
    return(
        <div>

        </div>
    );
}



/** events: `editor`, `events`, `settings` */ 
export default function Admin(props) {
    const [body, setVisible] = useState(<Statstics />)
    const [foot, setFoot] = useState()

    useEffect(()=> {
        if(props.visible.editor) setVisible(<AdminFormCreate visible={props.visible.editor} />)
        else if(props.visible.fs) setVisible(<FileManagers context={$state.files} visible={props.visible.fs} />)
        else if(props.visible.settings) setVisible(<Settings />)
        else setVisible(<Statstics />)
    }, [props])


    return(
        <div style={{backgroundColor:"rgba(28,29,30,1)",width:"100%",height:"100%"}}> 
            <Title size={[25, 70, 5]}>
                <div style={{display:"flex", flexDirection:"row"}}>
                    <Button color="secondary" fill="#dcdbdb66" onClick={()=> EVENT.emit("open.editor", "")}>
                        <BiStoreAlt />
                    </Button>
                    <Button color="secondary" fill="#dcdbdb66" onClick={()=> EVENT.emit("open.events", "")}>
                        <FcStatistics />
                    </Button>
                    <Button color="secondary" fill="#dcdbdb66" onClick={()=> EVENT.emit("open.settings", "")}>
                        <FiSettings />
                    </Button>
                </div>
                <div style={{textAlign:"center"}}>админка {document.location.hostname}</div>
                <Button color="danger" onClick={()=> EVENT.emit("close.modal", "")}>
                    x
                </Button>
            </Title>
            <Body>
                { body }
            </Body>
            <Footer>
                { foot }
            </Footer>
        </div>
    );
}