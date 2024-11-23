import React, { useState } from "react";
import standart_empty_dot from "./../../Images/dots/empty_dot.png";
import standart_full_dot from "./../../Images/dots/full_dot.png";
import styles from "./DotsLine.module.css"
export default function DotsLine({ dotCount, valueRef ,minValue,dotsPerRow,initialValue, full_dot,empty_dot}) 
{
    const [dots, setDots] = useState(Array(dotCount || 8).fill(false));

    dotsPerRow = 10 || dotsPerRow
    initialValue = 0 || initialValue
    minValue = minValue || 0
    empty_dot = empty_dot || standart_empty_dot
    full_dot = full_dot || standart_full_dot

    function generateDots() 
    {
        let res = dots.map((isFull, index) => 
        (
            <span className={styles.img_out} key = {index}>
            <img
            className={styles.dotImage}
            key={index}
            src={isFull ? full_dot : empty_dot}
            height="25"
            width="25"
            onClick={() => onDotClick(index)}
            alt={`dot-${index}`}
            />
            </span>
        ));
        return res;
  }

  function onDotClick(dotIndex) {
    const newDots = [...dots];

    if (dots[dotIndex]) 
    {
        if(dotIndex >= minValue)
            for(let i = dotIndex;i < dotCount;i++)
                newDots[i] = false;
        else
        {
            for(let i = minValue;i < dotCount;i++)
                newDots[i] = false;
        }
    } 
    else 
    {
        for (let i = 0; i <= dotIndex; i++) 
        {
            newDots[i] = true;
        }
    }

    setDots(newDots);
  }
  return <div className={styles.block}>{generateDots()}</div>;
}