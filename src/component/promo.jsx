

export default function Promo(props){return(
    <section className="two">
        <h3> Вас приветсвует! </h3> 
        <h3 style={{marginTop:"-15px"}}> Производитель ТОВ АЛЮМИНКА </h3>
        <div className="prom-blok">
            <h5 className="info" style={{width:"65%"}}>
                { $promoText }
            </h5>
             <img src="img/title.png" className="prom-img"/>
        </div>
        <div className="button"> Смотреть еще </div>
    </section>
)};