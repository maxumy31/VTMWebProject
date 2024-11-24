import DotsLine from "./DotsLine";
import styles from "./Humanity.module.css"

export default function Humanity({onValueChange})
{
    return(
        <>
        <h4>Путь</h4>

        <input className={styles.width} placeholder="Путь"
        onChange={(e) => onValueChange("Название пути",e.target.value)}/>
        
        <DotsLine onChange={(nv) => onValueChange("Значение пути",nv)} dotCount={10}/>
        </>
    )
}