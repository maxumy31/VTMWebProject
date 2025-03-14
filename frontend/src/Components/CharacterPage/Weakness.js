export default function Weakness({onValueChange,initCharacterData})
{
    const key = "Слабость"
    return(
        <>
        <h4>{key}</h4>
        <input onChange={(e) => onValueChange(key,e.target.value)} 
        defaultValue={initCharacterData.hasOwnProperty(key) ? initCharacterData[key] : ""}/>
        </>
    )
}