
import { apiService } from "../../Api/ApiService";
import styles from "./CharacterPreview.module.css";

export default function CharacterPreview({ initCharacterData ,loadNextPage, onDelete}) {
    const defaultKeys = ["Имя","Концепт","Поколение","Натура"]
    let characterValues = []
    const dictCharacterData = JSON.parse(initCharacterData["characterData"])
    console.log(initCharacterData)

    for(let i = 0; i < defaultKeys.length;i++)
    {
        if(dictCharacterData.hasOwnProperty(defaultKeys[i]))
        {
            characterValues.push(dictCharacterData[defaultKeys[i]])
        }
        else
        {
            characterValues.push("")
        }
    }


    function formatDescriptionData() {
        return defaultKeys.map((v, i) => 
            (
            <h4 className={styles.character_description} key={i}>
                {defaultKeys[i]} : {characterValues[i]}
            </h4>));
    }

    function loadCharacter()
    {
        localStorage.setItem("character",JSON.stringify(initCharacterData))
        console.log(initCharacterData,"saved")
        loadNextPage("character")
    }

    function deleteCharacter()
    {
        var answer = window.confirm("Вы действительно хотите удалить персонажа " + dictCharacterData["Имя"] + " ?")
        if(!answer)
        {
            return
        }
        
        apiService.delete("Character?id=" + initCharacterData["id"]).then(r =>
        {
            console.log(r)
            onDelete()
        }
        )
    }

    return (
        <div className={styles.wrap}>
            <div className={styles.text_wrap}>{formatDescriptionData(initCharacterData)}</div>
            <button className={styles.button} onClick = {loadCharacter}>Открыть персонажа</button>
            <button className={styles.button} onClick={deleteCharacter}>Удалить персонажа</button>
        
        </div>
    );
}