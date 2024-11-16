import empty_dot from "./../../Images/dots/empty_dot.png"
import full_dot from "./../../Images/dots/full_dot.png"
import DotsLine from "./DotsLine"

export default function InputColumn({columnName,rowsCount})
{
    columnName = columnName || "Empty column name"
    rowsCount = rowsCount || 6

    function RenderRows()
    {
      let i = 0
      return Array.from({ length: 8 }).map(x => <p key = {i++}><input/><DotsLine dotCount={8} valueRef={123}/></p>);
    };
    return(
        <>
        <h3>{columnName}</h3>
        {RenderRows()}
        </>
    )
}