import CharacterPreview from "../Components/CharacterOverview/CharacterPreview";
import CreateNewCharacter from "../Components/CharacterOverview/CreateNewCharacter";
import styles from "./CharacterOverview.module.css"

export default function CharacterOverview({loadNextPage})
{
    return(
        <div className={styles.character_columns}>
            <CharacterPreview loadNextPage = {loadNextPage}/>
            <CreateNewCharacter loadNextPage = {loadNextPage}/>
        </div>
    )
}