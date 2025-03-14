
import DotsLine from "./DotsLine"
import styles from "./StatsColumn.module.css"


export default function StatsColumn({statsList,columnName,dotCount,onValueChange,initCharacterData,initialDotValue, minValue})
{
    initialDotValue = initialDotValue || 0
    minValue = minValue || 0
    statsList = statsList || ["empty"]
    dotCount = dotCount || 8
    columnName = columnName || "Empty column name"

    const exists = statsList.filter(v => initCharacterData.hasOwnProperty(v))

    const items = statsList.map((v,i)=>(<div className={styles.text} key = {i}><h4>{v}</h4>
        <DotsLine minValue={minValue} dotCount={8} 
        initialValue={exists.includes(statsList[i]) ? initCharacterData[statsList[i]] : initialDotValue} 
        onChange={(nv) => onValueChange(v,nv)}/></div>))
    return(
        <>
        <h3 className={styles.text}>{columnName}</h3>
        {items}
        </>
    )
}