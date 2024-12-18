import DotsLine from "./DotsLine";
import styles from "./Humanity.module.css"

export default function Humanity({onValueChange,initCharacterData})
{
    const header = "Путь"
    const key1 = "Название пути"
    const key2 = "Значение пути"
    return(
        <>
        <h4>{header}</h4>

        <input className={styles.width} placeholder="Путь"
        onChange={(e) => onValueChange("Название пути",e.target.value)}
        defaultValue={initCharacterData.hasOwnProperty(key1) ? initCharacterData[key1] : ""}/>
        
        <DotsLine onChange={(nv) => onValueChange("Значение пути",nv)} dotCount={10}
            initialValue={initCharacterData.hasOwnProperty(key2) ? initCharacterData[key2] : 0}/>
        </>
    )
}