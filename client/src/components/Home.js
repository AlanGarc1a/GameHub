import React, { useContext } from 'react';
import AuthContext from './store/AuthContext';
import GameList from './games/GameList';
import Header from './Header';

const Home = () => {
    const { userData } = useContext(AuthContext);

    return (
        <div>
            {
                userData.user ? <GameList /> : <Header />
            }
        </div>
    );

}

export default Home;