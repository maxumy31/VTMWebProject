import DotsLine from "./DotsLine";
import styles from "./Bloodpool.module.css"
export default function Bloodpool({onValueChange,initCharacterData})
{
    const header = "Запас крови"
    const key = "Запас крови"
    let bloodReserved = initCharacterData.hasOwnProperty(key) ? initCharacterData[key] : 0
    return(
        <div className={styles.wrap}>
        <h4>{header}</h4>
        {
            Array(4).fill(0).map( (v,id) => 
            <DotsLine key = {id} dotCount={10} 
                onChange={(nv,ov) =>
                    {
                    bloodReserved -= ov
                    bloodReserved += nv
                    onValueChange(key,bloodReserved)
                    }}

                initialValue = { (() => {
                    if(bloodReserved >= 10)
                    {
                        bloodReserved -= 10
                       return 10
                    }
                    else
                    {
                        let left = bloodReserved
                        bloodReserved = 0
                        return left
                    }
                    })()}
            />)
        }
        </div>
    )
}