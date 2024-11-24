
import styles from "./CharacterPreview.module.css";

export default function CharacterPreview({ characterData ,loadNextPage}) {
    characterData = characterData || [["Имя", "Дракула"], ["Поколение", "4"]];
    console.log(characterData);

    // Convert data into an array of <h4> elements with "key:value" format.
    function data_to_h(data) {
        return data.map(([key, value], index) => (
            <h4 className={styles.character_description} key={index}>
                {key} : {value}
            </h4>
        ));
    }

    return (
        <div className={styles.wrap}>
            {data_to_h(characterData)}
            <button className={styles.button} onClick = {() => loadNextPage("character")}>Открыть персонажа</button>
            <button className={styles.button}>Удалить персонажа</button>
        
        </div>
    );
}