import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import GameCardCreate from './games/GameCardCreate';
import GameCardEdit from './games/GameCardEdit';

const App = () => {

    return (
        <div>
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/login" exact component={Login} />
                        <Route path="/register" exact component={Register} />
                        <Route path="/create" exact component={GameCardCreate} />
                        <Route path="/edit/:id" exact component={GameCardEdit} />
                    </Switch>
                </div>
            </BrowserRouter>
        </div>
    );
};

export default App;