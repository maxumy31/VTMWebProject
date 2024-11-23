import DotsLine from "./DotsLine";

export default function Virtues()
{
    return(
        <>
        <h3>Добродетели</h3>
        <div><h5>Сознательность/Убежденность</h5><DotsLine dotCount={7} minValue={1}/></div>
        <div><h5>Самоконтроль/Инстинкты</h5><DotsLine dotCount={7} minValue={1}/></div>
        <div><h5>Смелость</h5><DotsLine dotCount={7} minValue={1}/></div>
        </>
    )
}