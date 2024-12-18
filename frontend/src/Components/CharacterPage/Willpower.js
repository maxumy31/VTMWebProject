import DotsLine from "./DotsLine";

import empty_square from "./../../Images/squares/empty_square.png";
import filled_square from "./../../Images/squares/filled_square.png";

export default function Willpower({onValueChange,initCharacterData})
{
    const key1 = "Постоянная сила воли"
    const key2 = "Сила воли"
    return(
        <>
        <h4>Сила воли</h4>
        <DotsLine dotCount={10} onChange={(nv) => onValueChange(key1,nv)} 
        initialValue={initCharacterData.hasOwnProperty(key1) ? initCharacterData[key1] : 0}/>

        <DotsLine dotCount={10} onChange={(nv) => onValueChange(key2,nv)} empty_dot={empty_square} full_dot = {filled_square}
        initialValue={initCharacterData.hasOwnProperty(key2) ? initCharacterData[key2] : 0}/>
        </>
    )
}