import React, { useState } from 'react';
import AuthPage from './Pages/AuthPage';
import CharacterOverview from './Pages/CharacterOverview';
import CharacterPage from './Pages/CharacterPage';

export default function App(){
    const [currentPage, setCurrentPage] = useState('auth')

    const pageComponents = {
        "auth": <AuthPage loadNextPage={setCurrentPage}/>,
        "character_overview": <CharacterOverview loadNextPage={setCurrentPage}/>,
        "character": <CharacterPage/>
    }


    return (
        <div>


            <div>{pageComponents[currentPage]}</div>
        </div>
    )
}