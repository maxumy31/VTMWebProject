import DotsLine from "./DotsLine";
import styles from "./Humanity.module.css"

export default function Humanity()
{
    return(
        <>
        <h4>Путь</h4>
        <input className={styles.width} placeholder="Path" value="Человечность" onChange={() => console.log("123")}/>
        <DotsLine dotCount={10}/>
        </>
    )
}