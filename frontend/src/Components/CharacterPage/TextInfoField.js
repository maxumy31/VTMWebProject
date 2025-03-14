export default function TextInfoField({placeholderText,onValueChange, initCharacterData})
{
    const key = placeholderText
    const exists = initCharacterData[key] !== undefined
    const defValue = [exists].filter(x => x === true).map(x => initCharacterData[key])
    return(
        <div>
            <h4>{placeholderText}</h4>
            <input onChange={(e) => onValueChange(key,e.target.value)} defaultValue={defValue}/>
        </div>
    )
}