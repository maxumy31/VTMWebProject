import DotsLine from "./DotsLine";

import empty_square from "./../../Images/squares/empty_square.png";
import filled_square from "./../../Images/squares/filled_square.png";

export default function Willpower()
{
    return(
        <>
        <h4>Сила воли</h4>
        <DotsLine dotCount={10}/>
        <DotsLine dotCount={10} empty_dot={empty_square} full_dot = {filled_square}/>
        </>
    )
}