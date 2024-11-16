import styles from "./CharacterPreview.module.css";
import styles2 from "./CreateNewCharacter.module.css";

export default function CreateNewCharacter({loadNextPage}){
    return (
        <div className={styles.wrap}>
            <button className={styles2.createButton} onClick = {() => loadNextPage("character")}> Create new character</button>
        </div>
    )
}