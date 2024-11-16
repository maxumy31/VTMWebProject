import React, { useState } from "react";

export default function Health()
{
    const [health,setHealth] = useState(Array(7).fill(0))
    const images = ["https://img.freepik.com/premium-vector/pattern-cat-pixels-can-be-used-everything-clothes-stationery-covers-cases-pastels-b_657328-49.jpg?w=360","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTlFZKzD21LY9hEnutex7gD7W88kL_mdQ1OA&s","https://i.pinimg.com/564x/31/f1/58/31f158ec97d4d205c6d374b8d2521caa.jpg","https://www.shutterstock.com/image-vector/this-cat-pixel-art-colorful-260nw-2308028649.jpg"]
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
        }
        newStates[dot] = newState
        setHealth(newStates)

    }
    return(
        <>
        <h4>Health</h4>
        <p> <img src = {images[health[0]]} onClick={() => toggleHelth(0)} width = "80px"/>Bruised</p>
        <p> <img src = {images[health[1]]} onClick={() => toggleHelth(1)} width = "80px"/>Hurt</p>
        <p> <img src = {images[health[2]]} onClick={() => toggleHelth(2)} width = "80px"/>Wounde</p>
        <p> <img src = {images[health[3]]} onClick={() => toggleHelth(3)} width = "80px"/>Mauled</p>
        <p> <img src = {images[health[4]]} onClick={() => toggleHelth(4)} width = "80px"/>Crippled</p>
        <p> <img src = {images[health[5]]} onClick={() => toggleHelth(5)} width = "80px"/>Incapacitated</p>
        </>
    )
}