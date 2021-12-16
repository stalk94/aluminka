import React, { useEffect, useState } from 'react';
import { Drawer, PasswordInput, TextInput, Button } from '@mantine/core';



export default function RegForm(props) {
    const [login, setLogin] = useState()
    const [pass, setPass] = useState()

    return(
        <>
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
                    onChange={setLogin}
                    required
                    
                />
                <PasswordInput 
                    placeholder="min 6, max 35"
                    label="password"
                    required
                    onChange={setPass}
                />
                <Button onClick={()=> EVENT.emit("auth", {login:login,password:pass})} color="green" variant="outline">
                    Авторизация
                </Button>
                <Button onClick={()=> EVENT.emit("reg", {login:login,password:pass})} color="yellow" variant="white">
                    Регистрация
                </Button>
            </Drawer>
        </>
    );
}
