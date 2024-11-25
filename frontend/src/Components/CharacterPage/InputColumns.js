
import DotsLine from "./DotsLine"
import styles from "./InputColumn.module.css"

export default function InputColumn({columnName,rowsCount,onValueChange,initCharacterData})
{
    columnName = columnName || "Empty column name"
    rowsCount = rowsCount || 6

    function getColumnName(column,id)
    {
      return column + id + "Name"
    }

    function getColumnValueName(column,id)
    {
      return column + id + "Value"
    }

    function RenderRows()
    {
      return Array.from({ length: 8 }).map((x,i) => 
      <div key = {i}>
        <input className={styles.input} 
        onChange={(e) => onValueChange(getColumnName(columnName,i),e.target.value)}
        defaultValue={initCharacterData.hasOwnProperty(getColumnName(columnName,i)) ? initCharacterData[getColumnName(columnName,i)] : ""}/>

        <DotsLine dotCount={8} onChange={(nv) => onValueChange(getColumnValueName(columnName,i),nv)}
          initialValue={initCharacterData.hasOwnProperty(getColumnValueName(columnName,i)) ? initCharacterData[getColumnValueName(columnName,i)] : 0}/>
      </div>);
    };


    return(
        <>
        <h3>{columnName}</h3>
        {RenderRows()}
        </>
    )
}