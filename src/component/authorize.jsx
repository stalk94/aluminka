import React from 'react';
import { Drawer, PasswordInput, TextInput, Button, LoadingOverlay, MantineProvider } from '@mantine/core';
import { useDidMount } from 'rooks';
import { useState } from '@hookstate/core';
import globalState from "../global.state";


export default function RegForm(props) {
    const state = useState(globalState);
    const [opened, setOpened] = React.useState(false);
    const [login, setLogin] = React.useState();
    const [pass, setPass] = React.useState();
    const [visible, setVisible] = React.useState(false);

    useDidMount(()=> {
        EVENT.on("reg", ()=> setVisible(true));
        EVENT.on("auth", ()=> {
            setVisible(true)
            localStorage.clear()
        });
        EVENT.on("sucess.reg", ()=> setVisible(false));
        EVENT.on("sucess.auth", (data)=> {
            localStorage.setItem("user", JSON.stringify(data))
            state.user.set(data)
            setVisible(false)
            props.setOpened(false)
        });
        EVENT.on("error.reg", ()=> setVisible(false));
        EVENT.on("error.auth", ()=> setVisible(false));
    });
    React.useEffect(()=> {
        let user = JSON.parse(localStorage.getItem("user"));
        if(user){
            state.user.set(user);
            props.setAuthorize(true)
        }
        setOpened(props.opened);
    }, [props])

    
    return(
        <MantineProvider theme={{colorScheme: 'dark'}}>
            <LoadingOverlay visible={visible} />
            <Drawer 
                opened={opened}
                onClose={()=> props.setOpened(false)}
                title="Авторизация/Регистрация"
                padding="xl"
                size="xl"
            >
                <TextInput 
                    label="login"
                    placeholder="min 3, max 35"
                    onChange={(e)=> setLogin(e.target.value)}
                    required
                    
                />
                <PasswordInput 
                    placeholder="min 6, max 35"
                    label="password"
                    required
                    onChange={(e)=> setPass(e.target.value)}
                />
                <Button onClick={()=> EVENT.emit("auth", {login:login,password:pass})} color="green" variant="outline">
                    Авторизация
                </Button>
                <Button onClick={()=> EVENT.emit("reg", {login:login,password:pass})} color="yellow" variant="white">
                    Регистрация
                </Button>
            </Drawer>
        </MantineProvider>
    );
}