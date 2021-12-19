import React, { useState } from 'react';
import { Drawer, PasswordInput, TextInput, Button, LoadingOverlay, MantineProvider } from '@mantine/core';
import { useDidMount } from 'rooks';



export default function RegForm(props) {
    const [login, setLogin] = useState()
    const [pass, setPass] = useState()
    const [visible, setVisible] = useState(false)

    useDidMount(()=> {
        EVENT.on("reg", ()=> setVisible(true));
        EVENT.on("auth", ()=> {
            setVisible(true)
            localStorage.clear()
        });
        EVENT.on("sucess.reg", ()=> setVisible(false));
        EVENT.on("sucess.auth", (data)=> {
            localStorage.setItem("user", JSON.stringify(data))
            globalThis.$state.user = data
            setVisible(false)
            props.setOpened(false)
        });
        EVENT.on("error.reg", ()=> setVisible(false));
        EVENT.on("error.auth", ()=> setVisible(false));
    })

    return(
        <MantineProvider theme={{colorScheme: 'dark'}}>
            <LoadingOverlay visible={visible} />
            <Drawer 
                opened={props.opened}
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