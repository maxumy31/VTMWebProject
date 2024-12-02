import React, { useState } from 'react';
import AuthPage from './Pages/AuthPage';
import CharacterOverview from './Pages/CharacterOverview';
import CharacterPage from './Pages/CharacterPage';

export default function App(){
    const [currentPage, setCurrentPage] = useState('auth')
    let selectedCharacter = {}

    const pageComponents = {
        "auth": <AuthPage loadNextPage={setCurrentPage}/>,
        "character_overview": <CharacterOverview loadNextPage={setCurrentPage} selectedCharacter = {selectedCharacter}/>,
        "character": <CharacterPage loadNextPage={setCurrentPage}/>,
    }



    return (
        <div>
            <div>{pageComponents[currentPage]}</div>
        </div>
    )
}