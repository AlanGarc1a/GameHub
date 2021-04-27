import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import GameCardCreate from './games/GameCardCreate';
import GameCardEdit from './games/GameCardEdit';
import GameCardView from './games/GameCardView';
import NavBar from './NavBar';
import NotFound from './NotFound';

class App extends Component {

    render() {
        return (
            <div>
                <NavBar />
                <div>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/create" exact component={GameCardCreate} />
                        <Route path="/edit/:id" exact component={GameCardEdit} />
                        <Route path="/:title/:id" exact component={GameCardView} />
                        <Route path="*" exact component={NotFound} />
                    </Switch>
                </div> 
            </div>
        );
    }
};

export default App;