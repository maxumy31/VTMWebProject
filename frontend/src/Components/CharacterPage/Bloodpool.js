import DotsLine from "./DotsLine";
import styles from "./Bloodpool.module.css"
export default function Bloodpool()
{
    return(
        <div className={styles.wrap}>
        <h4>Запас крови</h4>
        <DotsLine dotCount={10}/>
        <DotsLine dotCount={10}/>
        <DotsLine dotCount={10}/>
        <DotsLine dotCount={10}/>
        </div>
    )
}