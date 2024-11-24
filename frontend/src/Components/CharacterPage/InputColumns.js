
import DotsLine from "./DotsLine"
import styles from "./InputColumn.module.css"

export default function InputColumn({columnName,rowsCount,onValueChange})
{
    columnName = columnName || "Empty column name"
    rowsCount = rowsCount || 6

    function RenderRows()
    {
      return Array.from({ length: 8 }).map((x,i) => 
      <div key = {i}>
        <input className={styles.input} onChange={(e) => onValueChange(columnName + i + "Name",e.target.value)}/>
        <DotsLine dotCount={8} onChange={(nv) => onValueChange(columnName + i + "Value",nv)}/>
      </div>);
    };
    return(
        <>
        <h3>{columnName}</h3>
        {RenderRows()}
        </>
    )
}