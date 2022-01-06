import React from 'react';
import ReactDOM from "react-dom";
import { Table } from '@mantine/core';
import { createState, useState } from '@hookstate/core';



const globalState = createState([
    ['https://ae04.alicdn.com/kf/HTB136m.bjzuK1RjSsppq6xz0XXah/-.jpg', 5800, 'Плинтус', 'Кутник металевий-4 шт, Гвинт DIN-16 шт', 2400, 2200],
    ['https://cdn.27.ua/499/53/84/152452_3.jpeg', 5800, 'Плинтус', 'Кутник металевий-4 шт, Гвинт DIN-16 шт', 4400, 4200]
]);




const Rows =({children})=> {
    return(
        children.map((elem, index)=> 
            <tr key={index}>
                <td>
                    <img width="200px" height="200px" src={elem[0]}/>
                </td>
                <td>{elem[1]} мм.</td>
                <td>{elem[2]}</td>
                <td>{elem[3]}</td>
                <td><del>{elem[4]}</del> {elem[5]} грн.</td>
            </tr>
        )
    );
}

const Prices =()=> {
    const state = useState(globalState);

    return(
        <Table>
            <thead>
                <tr>
                    <th>Зображення</th>
                    <th>Розмiр</th>
                    <th>Найменування</th>
                    <th>Комплектнicть</th>
                    <th>Роздрiбна цiна</th>
                </tr>
            </thead>
            <tbody>
                <Rows>
                    { state.get() }
                </Rows>
            </tbody>
        </Table>
    );
}


ReactDOM.render(<Prices/>, document.querySelector(".root"));