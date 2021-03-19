import React, { Component } from 'react';
import GameList from './games/GameList';

class Home extends Component {
    render() {
        return (
            <div>
                <GameList />
            </div>
        );
    }
}

export default Home;