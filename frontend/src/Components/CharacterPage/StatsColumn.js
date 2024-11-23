
import DotsLine from "./DotsLine"
import styles from "./StatsColumn.module.css"


export default function StatsColumn({statsList,columnName,dotCount})
{
    statsList = statsList || ["empty"]
    dotCount = dotCount || 8
    columnName = columnName || "Empty column name"

    let k = 0
    let items = statsList.map(p=>(<div className={styles.text} key = {k++}><h5>{statsList[k]}</h5><DotsLine minValue={2} dotCount={8} /></div>))
    return(
        <>
        <h3 className={styles.text}>{columnName}</h3>
        {items}
        </>
    )
}