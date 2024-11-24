
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
export default function CharacterPage({loadNextPage})
{
    let characters_stats = {}

    function onStatChange(name,newValue) {
        characters_stats[name] = newValue
        console.log(characters_stats)
    }
    
    return(
        
        <div className={styles.background}>
        <div><button className={styles.return_button} onClick={ () => loadNextPage("character_overview")}>Назад</button></div>
        <div className={styles.wrap}>
            <div className={styles.three_center_columns}>
                {[["Имя ","Игрок ", "Хроника "],["Натура ","Маска ", "Клан "],["Поколение ","Убежище ", "Конецпт "]].map((v,i) =>
                    <div key = {i} className={styles.column_description}>
                        {
                            v.map((vv,vi) => 
                            <TextInfoField key = {vi} onValueChange = {onStatChange} placeholderText={vv}/>)
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
                    Object.entries({
                        "Физические":["Сила","Ловкость","Выносливость"],
                        "Социальные":["Харизма","Манипуляции","Внешность"],
                        "Ментальные":["Восприятие","Интеллект","Смекалка"]
                    }).map(([k,v],i) => 
                    <div key = {i}>
                        <StatsColumn statsList={v} columnName={k} onValueChange={onStatChange}/>
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
                    Object.entries({
                        "Таланты":["Атлетика","Внимательность","Запугивание","Знание улиц","Лидерство","Рукопашный бой",
                            "Уклонение","Хитрость","Экспрессия","Эмпатия"],
                        "Навыки":["Безопасность","Вождение","Выживание","Исполнение","Знание животных","Ремесла",
                            "Скрытность","Стрельба","Фехтование","Этикет"],
                        "Знания":["Академические","Законы","Компьютеры","Лингвистика","Медицина","Научные","Оккультизм",
                            "Политика","Расследование","Финансы"]
                    }).map(([k,v],i) => 
                    <div key = {i}>
                        <StatsColumn statsList={v} columnName={k} onValueChange={onStatChange}/>
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
                    <InputColumn columnName={"Дополнения"} rowsCount={6} onValueChange = {onStatChange}/>
                </div>
                <div>
                    <InputColumn columnName={"Дисциплины"} rowsCount={6} onValueChange={onStatChange}/>
                </div>
                <div>
                    <Virtues onValueChange={onStatChange}/>
                </div>
            </div>

            <div>
                <hr size = "3" noshade = "true"></hr>
                <h2 className = {styles.header}>Прочее</h2>
                <hr size = "3" noshade = "true"></hr>
            </div>

            <div className={styles.three_center_columns}>
                
                <div>
                    <InputColumn columnName={"Остальные черты"} rowsCount={12} onValueChange={onStatChange}/>
                </div>
                <div>
                    <div>
                        <Humanity onValueChange = {onStatChange}/>
                    </div>
                    <div>
                        <Willpower onValueChange={onStatChange}/>
                    </div>
                    <div>
                        <Bloodpool onValueChange = {onStatChange}/>
                    </div>
                </div>
                <div>
                    <div>
                        <Health onValueChange={onStatChange}/>
                    </div>
                    <div>
                        <Weakness onValueChange={onStatChange}/>
                    </div>
                    <div>
                        <Experience onValueChange={onStatChange}/>
                    </div>
                </div>
            </div>
            
            
        </div>
        </div>
    )
}