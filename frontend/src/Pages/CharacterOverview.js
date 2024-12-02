import CharacterPreview from "../Components/CharacterOverview/CharacterPreview";
import CreateNewCharacter from "../Components/CharacterOverview/CreateNewCharacter";
import styles from "./CharacterOverview.module.css"
import { apiService } from '../Api/ApiService.js';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, clearUser, store } from './../Store/store'; 


export default function CharacterOverview({loadNextPage})
{
    let userID = 0
    const [characters, setCharacters] = useState([])
    const [isLoading, setLoading] = useState(true)

    const dispatch = useDispatch()

    const user = useSelector((state) => state.user)

    
    if(isLoading)
    apiService.get('Characters?userID=' + user.id).then( r=>
        {
            const data = r.data['data']
            const filteredData = data.filter(v => v.hasOwnProperty("characterData")).sort((a,b) => a["Последнее изменение"] - b["Последнее изменение"]).reverse()
            console.log(filteredData)
            setCharacters(filteredData)
        }).finally( () =>
            {
                setLoading(false)
            })

    console.log("user = ",user)
    localStorage.removeItem("character")


    function logout()
    {
        localStorage.clear()
        dispatch(clearUser());
        apiService.delete("Auth").then(r =>
        {
            loadNextPage("auth")
        })
    }

    return(
        <>
            <button className = {styles.return_button} onClick={logout}>Выйти</button>
            <div className={styles.character_columns}>
                {
                    characters.map((v,i) =>
                        <CharacterPreview key = {i} initCharacterData={characters[i]} loadNextPage={loadNextPage} onDelete = {() => setLoading(true)}/>
                    )
                }
                <CreateNewCharacter loadNextPage = {loadNextPage}/>
            </div>
        </>
    )
}