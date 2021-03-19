import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import GameCardCreate from './games/GameCardCreate';
import GameCardEdit from './games/GameCardEdit';
import NavBar from './NavBar';

class App extends Component {

    render() {
        return (
            <div>
                <NavBar />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/create" exact component={GameCardCreate} />
                    <Route path="/edit/:id" exact component={GameCardEdit} />
                </Switch>
            </div>
        );
    }
};

export default App;