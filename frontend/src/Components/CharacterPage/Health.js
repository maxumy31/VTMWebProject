import React, { useState } from "react";

import aggravated_damage from "./../../Images/damage/aggravated_damage.png";
import lethal_damage from "./../../Images/damage/lethal_damage.png";
import blunt_damage from "./../../Images/damage/blunt_damage.png";

import full_health from "./../../Images/damage/empty_square.png";




export default function Health()
{
    const [health,setHealth] = useState(Array(8).fill(0))
    const images = [full_health,blunt_damage,lethal_damage,aggravated_damage]
    let toggleHelth = function(dot) {
        let state = health[dot]
        let newState = 0
        const newStates = [...health];
        switch(state) 
        {
            case 0:
                newState = 1;
                break;
            case 1:
                newState = 2;
                break;
            case 2:
                newState = 3;
                break;
            case 3:
                newState = 0;
                break; 
            default:
                newState = 0;
                break;
        }
        newStates[dot] = newState
        setHealth(newStates)
    }

    const healthConditions = ["Задет","Поврежден(-1)","Ранен(-1)","Тяжело ранен(-2)","Травмирован(-2)","Искалечен(-5)","Обездвижен(торпор)"]

    

    return(
        <>
        <h4>Здоровье</h4>
        {healthConditions.map( (v,id) => <p key = {id}><img src = {images[health[id]]} alt = {"Картинка не найдена"} onClick={() => toggleHelth(id)} width = "30px" />{v}</p>)}
 
        </>
    )
}