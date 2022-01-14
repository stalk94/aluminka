import React from 'react';


export const Feedback =()=> (
    <section>
        <div style={{paddingLeft:"40%"}}>
            <h2 style={{paddingLeft:"1%"}}>Остались вопросы?</h2>
            <form className="column" method="POST" action={"/question"}>
                <input type="text" name="name" placeholder="Ваше имя:"/>
                <input type="email" name="email" placeholder="Ваш email:"/>
                <input type="text" name="text" placeholder="Ваш вопрос:"/>
                <input type="submit" placeholder="Отправить"/>
            </form>
        </div>
    </section>
);


export default function Footer(props) {
    return(
        <>
            <section className="line">
                <ul className="column">
                    <li>Контакты</li>
                    <li>Возврат товара</li>
                    <li>Условия и договор</li>
                </ul>
                <ul className="column" style={{marginLeft:"20%"}}>
                    <li>Каталог</li>
                    <li>Производители</li>
                    <li>Акции</li>
                </ul>
            </section>
            <section className="coop">
                ТОВ Алюминка - производство алюминиевых профилей © 2021
            </section>
        </>
    );
}