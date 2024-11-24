export default function Weakness({onValueChange})
{
    return(
        <>
        <h4>Слабость</h4>
        <input onChange={(e) => onValueChange("Слабость",e.target.value)}/>
        </>
    )
}