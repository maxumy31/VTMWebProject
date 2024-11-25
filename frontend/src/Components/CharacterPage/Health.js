import React, { useState } from "react";

import aggravated_damage from "./../../Images/damage/aggravated_damage.png";
import lethal_damage from "./../../Images/damage/lethal_damage.png";
import blunt_damage from "./../../Images/damage/blunt_damage.png";

import full_health from "./../../Images/damage/empty_square.png";


export default function Health({onValueChange,initCharacterData})
{
    const [health,setHealth] = useState(Array(8).fill(0).map((v,i) => initCharacterData.hasOwnProperty(
        getHealthPointName(i)) ? initCharacterData[getHealthPointName(i)] : v))

    const images = [full_health,blunt_damage,lethal_damage,aggravated_damage]
    const healthConditions = ["Задет","Поврежден(-1)","Ранен(-1)","Тяжело ранен(-2)","Травмирован(-2)","Искалечен(-5)","Обездвижен(торпор)"]
    const header = "Здоровье"
    

    

    let toggleHealth = function(dot) {
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
        onValueChange(getHealthPointName(dot), newState)
        setHealth(newStates)
    }

    function getHealthPointName(dot) 
    {
        return "Здоровье" + dot
    }


    

    return(
        <>
        <h4>{header}</h4>
        {healthConditions.map( (v,id) => 
        <p key = {id}><img src = {images[health[id]]} alt = {"Картинка не найдена"} 
            onClick={() => toggleHealth(id)} width = "30px" />{v}
        </p>)}
        </>
    )
}