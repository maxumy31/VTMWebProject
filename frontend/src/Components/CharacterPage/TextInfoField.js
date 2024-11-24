export default function TextInfoField({placeholderText,onValueChange})
{
    return(
        <div>
            <h4>{placeholderText}</h4>
            <input onChange={(e) => onValueChange(placeholderText,e.target.value)}/>
        </div>
    )
}