import empty_dot from "./../../Images/dots/empty_dot.png"
import full_dot from "./../../Images/dots/full_dot.png"
import {useState} from 'react'
import DotsLine from "./DotsLine"

export default function StatsColumn({statsList,columnName,dotCount})
{
    statsList = statsList || ["empty"]
    dotCount = dotCount || 8
    columnName = columnName || "Empty column name"

    let k = 0
    let items = statsList.map(p=>(<p key = {k++}><h5>{statsList[k]}</h5><DotsLine minValue={2} dotCount={8} valueRef={123}/></p>))
    return(
        <>
        <h3>{columnName}</h3>
        {items}
        </>
    )
}