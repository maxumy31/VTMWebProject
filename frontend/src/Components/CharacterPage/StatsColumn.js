
import DotsLine from "./DotsLine"
import styles from "./StatsColumn.module.css"


export default function StatsColumn({statsList,columnName,dotCount,onValueChange})
{
    statsList = statsList || ["empty"]
    dotCount = dotCount || 8
    columnName = columnName || "Empty column name"

    let items = statsList.map((v,i)=>(<div className={styles.text} key = {i}><h5>{v}</h5><DotsLine minValue={1} dotCount={8} 
        onChange={(nv) => onValueChange(v,nv)}/></div>))
    return(
        <>
        <h3 className={styles.text}>{columnName}</h3>
        {items}
        </>
    )
}