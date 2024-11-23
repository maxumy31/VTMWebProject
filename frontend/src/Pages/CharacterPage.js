
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
export default function CharacterPage()
{
    return(
        <div className={styles.background}>
        <div className={styles.wrap}>
            <div className={styles.three_center_columns}>
                <div className={styles.column_description}>
                    <TextInfoField PlaceholderText={"Имя "}></TextInfoField>
                    <TextInfoField PlaceholderText={"Игрок "}></TextInfoField>
                    <TextInfoField PlaceholderText={"Хроника "}></TextInfoField>
                </div>
                <div className={styles.column_description}>
                    <TextInfoField PlaceholderText={"Натура "}></TextInfoField>
                    <TextInfoField PlaceholderText={"Маска "}></TextInfoField>
                    <TextInfoField PlaceholderText={"Клан "}></TextInfoField>
                </div>
                <div className={styles.column_description}>
                    <TextInfoField PlaceholderText={"Поколение "}></TextInfoField>
                    <TextInfoField PlaceholderText={"Убежище "}></TextInfoField>
                    <TextInfoField PlaceholderText={"Конецпт "}></TextInfoField>
                </div>
            </div>
            <div>
                <hr size = "3" noshade = "true"></hr>
                <h2 className = {styles.header}>Атрибуты</h2>
                <hr size = "3" noshade = "true"></hr>
            </div>
            
            <div className={styles.three_center_columns}>
                
                <div>
                    <StatsColumn statsList={["Сила","Ловкость","Выносливость"]} columnName={"Физические"}/>
                </div>
                <div>
                    <StatsColumn statsList={["Харизма","Манипуляции","Внешность"]} columnName={"Социальные"}/>
                </div>
                <div>
                    <StatsColumn statsList={["Восприятие","Интеллект","Смекалка"]} columnName={"Ментальные"}/>
                </div>
            </div>

            <div>
                <hr size = "3" noshade = "true"></hr>
                <h2 className = {styles.header}>Способности</h2>
                <hr size = "3" noshade = "true"></hr>
            </div>
            
            <div className={styles.three_center_columns}>
                
                <div>
                    <StatsColumn statsList={["Атлетика","Внимательность","Запугивание","Знание улиц","Лидерство","Рукопашный бой",
                        "Уклонение","Хитрость","Экспрессия","Эмпатия"]} columnName={"Таланты"}/>
                </div>
                <div>
                    <StatsColumn statsList={["Безопасность","Вождение","Выживание","Исполнение","Знание животных","Ремесла",
                        "Скрытность","Стрельба","Фехтование","Этикет"]} columnName={"Навыки"}/>
                </div>
                <div>
                    <StatsColumn statsList={["Академические","Законы","Компьютеры","Лингвистика","Медицина","Научные","Оккультизм",
                        "Политика","Расследование","Финансы"]} columnName={"Знания"}/>
                </div>
            </div>

            <div>
                <hr size = "3" noshade = "true"></hr>
                <h2 className = {styles.header}>Преимущества</h2>
                <hr size = "3" noshade = "true"></hr>
            </div>

            <div className={styles.three_center_columns}>
                
                <div>
                    <InputColumn columnName={"Дополнения"} rowsCount={6}/>
                </div>
                <div>
                <InputColumn columnName={"Дисциплины"} rowsCount={6}/>
                </div>
                <div>
                    <Virtues/>
                </div>
            </div>

            <div>
                <hr size = "3" noshade = "true"></hr>
                <h2 className = {styles.header}>Прочее</h2>
                <hr size = "3" noshade = "true"></hr>
            </div>

            <div className={styles.three_center_columns}>
                
                <div>
                    <InputColumn columnName={"Остальные черты"} rowsCount={12}/>
                </div>
                <div>
                    <div>
                        <Humanity/>
                    </div>
                    <div>
                        <Willpower/>
                    </div>
                    <div>
                        <Bloodpool/>
                    </div>
                </div>
                <div>
                    <div>
                        <Health/>
                    </div>
                    <div>
                        <Weakness/>
                    </div>
                    <div>
                        <Experience/>
                    </div>
                </div>
            </div>
            
            
        </div>
        </div>
    )
}