export default function Experience({onValueChange})
{
    return(
        <>
        <h4>Опыт</h4>
        <input onChange={(e) => onValueChange("Опыт",e.target.value)}/>
        </>
    )
}