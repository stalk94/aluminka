import React, { useState } from "react";
import { AdminFormCreate } from "../tovar-create";
import FileManagers from "../file-manager";
import { Button, Title, Body, Footer } from "../base";
import { BiStoreAlt } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { VscFileSubmodule } from "react-icons/vsc";
import { ImStatsBars } from "react-icons/im";



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
    const [fsVisible, setFsVisible] = useState(false)
    const [body, setBody] = useState(<Statstics />)
    const [foot, setFoot] = useState('')

   
    const useDir =(dir)=> {
        if(dir==='editor') setBody(<AdminFormCreate />);
        else if(dir==='fs') setBody(<FileManagers visible={fsVisible}  />);
        else if(dir==='setings') setBody(<Settings />);
        else setBody(<Statstics />);
    }
    const useFoot =()=> {

    }
    

    return(
        <div style={{backgroundColor:"rgba(28,29,30,0.98)"}}> 
            <Title size={[25, 70, 5]}>
                <div style={{display:"flex",flexDirection:"row",backgroundColor:"rgba(77,242,245,0.06)"}}>
                    <Button color="secondary" onClick={()=> useDir('editor')}>
                        <BiStoreAlt />
                    </Button>
                    <Button color="secondary" onClick={()=> useDir('statistic')}>
                        <ImStatsBars />
                    </Button>
                    <Button color="secondary" onClick={()=> useDir('fs')}>
                        <VscFileSubmodule />
                    </Button>
                    <Button color="secondary" onClick={()=> useDir('setings')}>
                        <FiSettings />
                    </Button>
                </div>
                <var style={{textAlign:"center",marginLeft:"30%"}}>
                    админка {document.location.hostname}
                </var>
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