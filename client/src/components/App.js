import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import GameCardCreate from './games/GameCardCreate';
import GameCardEdit from './games/GameCardEdit';
import GameCardView from './games/GameCardView';
import NavBar from './NavBar';
import Register from './Register';
import Login from './Login';
import NotFound from './NotFound';
import AuthContext from './store/AuthContext';

const App = () => {

    const authCntx = useContext(AuthContext);
    const isLoggedIn = authCntx.isLoggedIn;

    return (
        <div>
            <NavBar />
            <div>
                <Switch>
                    {isLoggedIn && (
                        <Route path="/" exact component={Home} />
                    )}

                    {isLoggedIn && (
                        <Route path="/create" exact component={GameCardCreate} />
                    )}

                    {isLoggedIn && (
                        <Route path="/edit/:id" exact component={GameCardEdit} />
                    )}

                    {isLoggedIn && (
                        <Route path="/:title/:id" exact component={GameCardView} />
                    )}
                    {!isLoggedIn && (
                        <Route path="/register" exact component={Register} />
                    )}

                    {!isLoggedIn && (
                        <Route path="/login" exact component={Login} />
                    )}
                    <Route path="*" exact component={NotFound} />
                </Switch>
            </div>
        </div>
    );

};

export default App;