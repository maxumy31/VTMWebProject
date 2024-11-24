import CharacterPreview from "../Components/CharacterOverview/CharacterPreview";
import CreateNewCharacter from "../Components/CharacterOverview/CreateNewCharacter";
import styles from "./CharacterOverview.module.css"

export default function CharacterOverview({loadNextPage})
{
    return(
        <>
            <button className = {styles.return_button} onClick={ () => loadNextPage("auth")}>Выйти</button>
            <div className={styles.character_columns}>
            
                <CharacterPreview loadNextPage = {loadNextPage}/>
                <CreateNewCharacter loadNextPage = {loadNextPage}/>
            </div>
        </>
    )
}