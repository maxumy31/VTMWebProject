import DotsLine from "./DotsLine";
import styles from "./Bloodpool.module.css"
export default function Bloodpool({initialValue, onValueChange})
{
    let bloodReserved = 0
    return(
        <div className={styles.wrap}>
        <h4>Запас крови</h4>
        {
            Array(4).fill(0).map( (v,id) => 
                <DotsLine key = {id} dotCount={10} onChange={(nv,ov) =>
                    {
                    bloodReserved -= ov
                    bloodReserved += nv
                    onValueChange("Запас крови",bloodReserved)
                    }
                }/>
            )
        }
        </div>
    )
}