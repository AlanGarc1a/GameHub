import React, { Component } from 'react';
import NavBar from './NavBar';
import GameList from './games/GameList';

class Home extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <GameList />
            </div>
        );
    }
}

export default Home;