import DotsLine from "./DotsLine";

export default function Virtues({onValueChange,initCharacterData})
{
    const header = "Добродетели"
    const keys = ["Сознательность/Убежденность","Самоконтроль/Инстинкты","Смелость"]
    return(
        <>
        <h3>{header}</h3>
        {
            keys.map((k,i) => 
                <div key = {i}>
                    <h4>{keys[i]}</h4>
                    <DotsLine dotCount={7} minValue={1}
                    onChange={(nv) => onValueChange(keys[i],nv)}
                    initialValue={initCharacterData.hasOwnProperty(keys[i]) ? initCharacterData[keys[i]] : 1}/>
                </div>
            )
        }
        </>
    )
}