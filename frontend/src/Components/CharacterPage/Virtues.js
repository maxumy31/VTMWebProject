import DotsLine from "./DotsLine";

export default function Virtues()
{
    return(
        <>
        <h3>Virtues</h3>
        <p><h5>Concience</h5><DotsLine dotCount={7} minValue={1}/></p>
        <p><h5>Self-Control</h5><DotsLine dotCount={7} minValue={1}/></p>
        <p><h5>Courage</h5><DotsLine dotCount={7} minValue={1}/></p>
        </>
    )
}