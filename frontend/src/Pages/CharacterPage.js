
import Bloodpool from "../Components/CharacterPage/Bloodpool";
import DotsLine from "../Components/CharacterPage/DotsLine";
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
                    <TextInfoField PlaceholderText={"Name "}></TextInfoField>
                    <TextInfoField PlaceholderText={"Chronicle "}></TextInfoField>
                    <TextInfoField PlaceholderText={"Sire "}></TextInfoField>
                </div>
                <div className={styles.column_description}>
                    <TextInfoField PlaceholderText={"Concept "}></TextInfoField>
                    <TextInfoField PlaceholderText={"Ambition "}></TextInfoField>
                    <TextInfoField PlaceholderText={"Desire "}></TextInfoField>
                </div>
                <div className={styles.column_description}>
                    <TextInfoField PlaceholderText={"Predator "}></TextInfoField>
                    <TextInfoField PlaceholderText={"Clan "}></TextInfoField>
                    <TextInfoField PlaceholderText={"Generation "}></TextInfoField>
                </div>
            </div>
            <div>
                <h2 className = {styles.header}>Attributes</h2>
                <hr size = "5" noshade = "true"></hr>
            </div>
            
            <div className={styles.three_center_columns}>
                
                <div>
                    <StatsColumn statsList={["Strength","Agility","Stamina"]} columnName={"Physical"}/>
                </div>
                <div>
                    <StatsColumn statsList={["Charisma","Manipulation","Appearance"]} columnName={"Social"}/>
                </div>
                <div>
                    <StatsColumn statsList={["Intelligence","Wits","Resolve"]} columnName={"Mental"}/>
                </div>
            </div>

            <div>
                <h2 className = {styles.header}>Skills</h2>
                <hr size = "5" noshade = "true"></hr>
            </div>
            
            <div className={styles.three_center_columns}>
                
                <div>
                    <StatsColumn statsList={["Alertness","Athletics","Brawl","Dodge","Empathy","Expression","Intimidation","Leadership","Streetwise","Subterfuge"]} columnName={"Talents"}/>
                </div>
                <div>
                    <StatsColumn statsList={["Animal Ken","Crafts","Drive","Etiquette","Firearms","Melee","Performance","Security","Stealth","Survival"]} columnName={"Skills"}/>
                </div>
                <div>
                    <StatsColumn statsList={["Academics","Computer","Finance","Investigation","Law","Linguistics","Medicine","Occult","Politics","Science"]} columnName={"Knowledges"}/>
                </div>
            </div>

            <div>
                <h2 className = {styles.header}>Advantages</h2>
                <hr size = "5" noshade = "true"></hr>
            </div>

            <div className={styles.three_center_columns}>
                
                <div>
                    <InputColumn columnName={"Backgrounds"} rowsCount={6}/>
                </div>
                <div>
                <InputColumn columnName={"Disciplines"} rowsCount={6}/>
                </div>
                <div>
                    <Virtues/>
                </div>
            </div>

            <div>
                <h2 className = {styles.header}></h2>
                <hr size = "5" noshade = "true"></hr>
            </div>

            <div className={styles.three_center_columns}>
                
                <div>
                    <InputColumn columnName={"Other traits"} rowsCount={12}/>
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