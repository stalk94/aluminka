import React, { useEffect, useState } from 'react';
import { Drawer, PasswordInput, TextInput, Button } from '@mantine/core';



export default function RegForm(props) {
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
                    required
                />
                <PasswordInput 
                    placeholder="min 6, max 35"
                    label="password"
                    required
                />
                <Button color="green" variant="outline">
                    Авторизация
                </Button>
                <Button color="yellow" variant="white">
                    Регистрация
                </Button>
            </Drawer>
        </>
    );
}
