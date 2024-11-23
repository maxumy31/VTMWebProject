import CharacterPage from "../../Pages/CharacterPage";
import styles from "./CharacterPreview.module.css";

export default function CharacterPreview({ character_data ,loadNextPage}) {
    character_data = character_data || [["Attr1", "Value1"], ["Attr2", "Value2"]];
    console.log(character_data);

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
            {data_to_h(character_data)}
            <button className={styles.button} onClick = {() => loadNextPage("character")}>Open</button>
            <button className={styles.button}>Delete</button>
        
        </div>
    );
}