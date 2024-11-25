export default function Experience({onValueChange,initCharacterData})
{
    const header = "Опыт"
    const key = "Опыт"
    return(
        <>
        <h4>{header}</h4>
        <input onChange={(e) => onValueChange(key,e.target.value)} type = "number"
        defaultValue={initCharacterData.hasOwnProperty[key] ? initCharacterData[key] : 0}/>
        </>
    )
}