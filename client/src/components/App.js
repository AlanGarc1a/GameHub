import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import GameCardCreate from './games/GameCardCreate';

const App = () => {

    return (
        <div>
            <BrowserRouter>
                <div>
                    <Route path="/" exact component={Home} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/register" exact component={Register} />
                    <Route path="/create" exact component={GameCardCreate} />
                </div>
            </BrowserRouter>
        </div>
    );
};

export default App;