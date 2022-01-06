import React, { useState, useEffect } from "react";
import Page from "./page";
import { Card, Image, Text, Badge, Button, Group, useMantineTheme } from '@mantine/core';



const Tovar =(props)=> {
    return(
        <Card style={{marginLeft:"5px"}} shadow="sm" padding="lg">
            <Card.Section>
                <Image src={props.src??'../../img/no-image.png'} width={"100%"} height={180} alt={props.name} />
            </Card.Section>
            <div style={{display:"flex", flexDirection:"row"}}>
                <Text style={{fontWeight:"bold"}}>{ props.name??"none" }</Text>
                <Badge size="lg" variant="dot" color="red">
                    <strike>{ props.price }грн</strike>
                </Badge>
                <Badge size="lg" variant="dot" color="lime">
                    { props.minPrice }грн
                </Badge>
            </div>
            <Button onClick={()=> props.click(props)} color="#da82ed" fullWidth style={{marginTop:14}}>
                Купить
            </Button>
        </Card>
    );
}



/**
 * {
  standart: 100,
  action: 80,
  description: 'test',
  types: 'без покрытия',
  model: 'led',
  category: 'plintus',
  width: 80,
  wucota: 80,
  height: 80,
  name: 'test',
  images: []
}
 */
export default function ListTovar(props) {
    const [data, setData] = useState(props.states??[])
    const [open, setOpen] = useState(false)
    const [view, setView] = useState("nav")
    
    useEffect(()=> setData(props.states), [props.states])
    

    return(
        <>
            {view==="nav"
                ? (data.length > 0 ? data.map((tovar, index)=> (
                    <Tovar
                        key={index} 
                        index={index}
                        src={tovar.images[0]} 
                        name={tovar.name} 
                        price={tovar.standart} 
                        minPrice={tovar.action} 
                        click={()=> setView(index)}
                        //openEditor={(ind)=> setOpen(data[ind])}
                    />
                )) : <var> Пока товаров нет </var>)
                : <Page 
                    images={data[view].images}
                    name={data[view].name}
                    model={data[view].model}
                    price={data[view].standart}
                    priceMin={data[view].action}
                    description={data[view].description}
                    material={data[view].types}
                    width={data[view].width}
                    vusota={data[view].wucota}
                    height={data[view].height}
                    //colors={data[view]}
                    onEnd={()=> setView("nav")}
                />
            }
        </>
    );
}