
import DotsLine from "./DotsLine"
import styles from "./InputColumn.module.css"

export default function InputColumn({columnName,rowsCount})
{
    columnName = columnName || "Empty column name"
    rowsCount = rowsCount || 6

    function RenderRows()
    {
      let i = 0
      return Array.from({ length: 8 }).map(x => <div key = {i++}><input className={styles.input}/><DotsLine dotCount={8} valueRef={123}/></div>);
    };
    return(
        <>
        <h3>{columnName}</h3>
        {RenderRows()}
        </>
    )
}