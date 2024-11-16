import DotsLine from "./DotsLine";

export default function Humanity()
{
    return(
        <>
        <h4>Humanity/path</h4>
        <input placeholder="Path" value="Humanity"/>
        <DotsLine dotCount={10}/>
        </>
    )
}