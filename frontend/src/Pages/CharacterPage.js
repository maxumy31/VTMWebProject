
import Bloodpool from "../Components/CharacterPage/Bloodpool";
import Experience from "../Components/CharacterPage/Experience";
import Health from "../Components/CharacterPage/Health";
import Humanity from "../Components/CharacterPage/Humanity";
import InputColumn from "../Components/CharacterPage/InputColumns";
import StatsColumn from "../Components/CharacterPage/StatsColumn";
import TextInfoField from "../Components/CharacterPage/TextInfoField";
import Virtues from "../Components/CharacterPage/Virtues";
import Weakness from "../Components/CharacterPage/Weakness";
import Willpower from "../Components/CharacterPage/Willpower";
import styles from "./CharacterPage.module.css";
import { apiService } from '../Api/ApiService.js';



export default function CharacterPage({loadNextPage})
{
    let charactersStats = {}
    let characterId
    const userID = localStorage.getItem("userID")
    let char = JSON.parse(localStorage.getItem("character"))
    console.log(char)
    
    if(char != null)
    {
        console.log("Loading character")
        charactersStats = JSON.parse(char["characterData"])
        console.log(charactersStats)
        characterId = char['id']
    }
    else
    {
        console.log("Creating new character")
        apiService.post("Character",{"characterData":JSON.stringify({"Имя":""}),"userID":userID}).then(r =>
        {
            characterId = r.data["data"]["id"]
        }
        )
    }



    function saveCharacter()
    {
        const date = Date()
        charactersStats["Последнее изменение"] = Date()
        const charString = (JSON.stringify(charactersStats))
        apiService.put('Character',{"id":characterId,"characterData":charString,"userID":userID})
    }

    function onStatChange(name,newValue) 
    {
        charactersStats[name] = newValue
        saveCharacter()
        console.log(charactersStats)
    }

    const headerData = [["Имя","Игрок", "Хроника"],["Натура","Маска", "Клан"],["Поколение","Убежище", "Концепт"]]

    const atributes = {
        "Физические":["Сила","Ловкость","Выносливость"],
        "Социальные":["Харизма","Манипуляции","Внешность"],
        "Ментальные":["Восприятие","Интеллект","Смекалка"]
    }

    const skills = {
        "Таланты":["Атлетика","Внимательность","Запугивание","Знание улиц","Лидерство","Рукопашный бой",
            "Уклонение","Хитрость","Экспрессия","Эмпатия"],
        "Навыки":["Безопасность","Вождение","Выживание","Исполнение","Знание животных","Ремесла",
            "Скрытность","Стрельба","Фехтование","Этикет"],
        "Знания":["Академические","Законы","Компьютеры","Лингвистика","Медицина","Научные","Оккультизм",
            "Политика","Расследование","Финансы"]
    }
    
    return(
        
        <div className={styles.background}>
        <div><button className={styles.return_button} onClick={ () => loadNextPage("character_overview")}>Назад</button></div>
        <div className={styles.wrap}>
            <div className={styles.three_center_columns}>
                {headerData.map((v,i) =>
                    <div key = {i} className={styles.column_description}>
                        {
                            v.map((vv,vi) => 
                            <TextInfoField key = {vi} onValueChange = {onStatChange} placeholderText={vv} initCharacterData={charactersStats}/>)
                        }
                    </div>)}
            </div>
            <div>
                <hr size = "3" noshade = "true"></hr>
                <h2 className = {styles.header}>Атрибуты</h2>
                <hr size = "3" noshade = "true"></hr>
            </div>
            
            <div className={styles.three_center_columns}>
                {
                    Object.entries(atributes).map(([k,v],i) => 
                    <div key = {i}>
                        <StatsColumn statsList={v} columnName={k} onValueChange={onStatChange} initCharacterData={charactersStats} minValue={1}/>
                    </div>)
                }
            </div>

            <div>
                <hr size = "3" noshade = "true"></hr>
                <h2 className = {styles.header}>Способности</h2>
                <hr size = "3" noshade = "true"></hr>
            </div>
            
            <div className={styles.three_center_columns}>
                {
                    Object.entries(skills).map(([k,v],i) => 
                    <div key = {i}>
                        <StatsColumn statsList={v} columnName={k} onValueChange={onStatChange} minValue={0} initCharacterData={charactersStats}/>
                    </div>)
                }
                
            </div>

            <div>
                <hr size = "3" noshade = "true"></hr>
                <h2 className = {styles.header}>Преимущества</h2>
                <hr size = "3" noshade = "true"></hr>
            </div>

            <div className={styles.three_center_columns}>
                <div>
                    <InputColumn columnName={"Дополнения"} rowsCount={6} onValueChange = {onStatChange} initCharacterData={charactersStats}/>
                </div>
                <div>
                    <InputColumn columnName={"Дисциплины"} rowsCount={6} onValueChange={onStatChange} initCharacterData={charactersStats}/>
                </div>
                <div>
                    <Virtues onValueChange={onStatChange} initCharacterData={charactersStats}/>
                </div>
            </div>

            <div>
                <hr size = "3" noshade = "true"></hr>
                <h2 className = {styles.header}>Прочее</h2>
                <hr size = "3" noshade = "true"></hr>
            </div>

            <div className={styles.three_center_columns}>
                
                <div>
                    <InputColumn columnName={"Остальные черты"} rowsCount={12} onValueChange={onStatChange} initCharacterData={charactersStats}/>
                </div>
                <div>
                    <div>
                        <Humanity onValueChange = {onStatChange} initCharacterData={charactersStats}/>
                    </div>
                    <div>
                        <Willpower onValueChange={onStatChange} initCharacterData={charactersStats}/>
                    </div>
                    <div>
                        <Bloodpool onValueChange = {onStatChange} initCharacterData={charactersStats}/>
                    </div>
                </div>
                <div>
                    <div>
                        <Health onValueChange={onStatChange} initCharacterData={charactersStats}/>
                    </div>
                    <div>
                        <Weakness onValueChange={onStatChange} initCharacterData={charactersStats}/>
                    </div>
                    <div>
                        <Experience onValueChange={onStatChange} initCharacterData={charactersStats}/>
                    </div>
                </div>
            </div>
            
            
        </div>
        </div>
    )
}