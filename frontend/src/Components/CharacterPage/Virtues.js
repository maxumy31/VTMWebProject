import DotsLine from "./DotsLine";

export default function Virtues({onValueChange})
{
    return(
        <>
        <h3>Добродетели</h3>
        <div>
            <h5>Сознательность/Убежденность</h5>
            <DotsLine dotCount={7} minValue={1}
            onChange={(nv) => onValueChange("Сознательность/Убежденность",nv)}/>
        </div>
        <div>
            <h5>Самоконтроль/Инстинкты</h5>
            <DotsLine dotCount={7} minValue={1}
            onChange={(nv) => onValueChange("Самоконтроль/Инстинкты",nv)}/>
        </div>
        <div>
            <h5>Смелость</h5>
            <DotsLine dotCount={7} minValue={1}onChange={(nv) => onValueChange("Смелость",nv)}/>
        </div>
        </>
    )
}