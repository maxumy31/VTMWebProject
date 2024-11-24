import DotsLine from "./DotsLine";

import empty_square from "./../../Images/squares/empty_square.png";
import filled_square from "./../../Images/squares/filled_square.png";

export default function Willpower({onValueChange})
{
    return(
        <>
        <h4>Сила воли</h4>
        <DotsLine dotCount={10} onChange={(nv) => onValueChange("Постоянная сила воли",nv)}/>
        <DotsLine dotCount={10} onChange={(nv) => onValueChange("Сила воли",nv)} empty_dot={empty_square} full_dot = {filled_square}/>
        </>
    )
}