import React, {useEffect, useState} from 'react';
import { FormClose, StatusGood, StatusWarning, StatusCritical } from 'grommet-icons';
import { Box, Button, Grommet, Layer } from 'grommet';


const Status = {
    "status-ok": <StatusGood/>,
    "status-warning": <StatusWarning/>,
    "status-error":  <StatusCritical/>,
    "status-err":  <StatusCritical/>
}


export default function NotificationLayer(props) {
    const [open, setOpen] = useState()
    const [text, setText] = useState("")
    const [status, setStatus] = useState("status-ok")
    
    const onOpen =()=> {
        setOpen(true)
        setTimeout(()=> setOpen(undefined), 4000);
    }

    useEffect(()=> {
        EVENT.on("payload", (txt)=> {
            setText(txt)
            setStatus("status-ok")
            onOpen()
        })
        EVENT.on("error", (txt)=> {
            setText(txt)
            setStatus("status-error")
            onOpen()
        })
        EVENT.on("warn", (txt)=> {
            setText(txt)
            setStatus("status-warning")
            onOpen()
        })
        EVENT.emit("payload", `рады снова тебя видеть`)
    }, [])


    return(
        <Grommet>
            {open &&
                <Layer
                    position="bottom"
                    modal={false}
                    margin={{vertical:'medium',horizontal:'small'}}
                    onEsc={()=> setOpen(undefined)}
                    responsive={false}
                    plain={true}
                >
                <Box
                    align="center"
                    direction="row"
                    gap="small"
                    justify="between"
                    round="medium"
                    elevation="medium"
                    pad={{vertical:'xsmall', horizontal:'medium'}}
                    background={status}
                >
                    <Box align="center" direction="row" gap="xsmall">
                        { Status[status] }
                        <var>{ text }</var>
                    </Box>
                    <Button icon={<FormClose/>} onClick={()=> setOpen(undefined)} plain />
                </Box>
                </Layer>
            }
        </Grommet>
    );
}