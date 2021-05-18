import React, { useState, useEffect } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Home from './Home';
import GameCardCreate from './games/GameCardCreate';
import GameCardEdit from './games/GameCardEdit';
import GameCardView from './games/GameCardView';
import NavBar from './NavBar';
import Register from './Register';
import Login from './Login';
import NotFound from './NotFound';
import AuthContext from './store/AuthContext';
import axios from 'axios';

function App() {

    const [userData, setUserData] = useState({
        token: undefined,
        user: undefined,
    });

    useEffect(() => {

        const checkLoggedIn = async () => {
            let token = localStorage.getItem("auth-token");

            if (token === null) {
                localStorage.setItem("auth-token", "");
                token = "";
            }

            const tokenResponse = await axios.post('http://localhost:5000/u/tokenIsValid', null, { headers: {"x-auth-token": token} });
            
            if (tokenResponse.data) {
                const userRes = await axios.get('http://localhost:5000/u/', {
                    headers: { "x-auth-token": token },
                });

                setUserData({
                    token,
                    user: userRes.data,
                });
            }
        }

        checkLoggedIn();
    }, []);

    return (
        <BrowserRouter>
            <AuthContext.Provider value={{ userData, setUserData }}>
                <NavBar />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/create" exact component={GameCardCreate} />
                    <Route path="/edit/:id" exact component={GameCardEdit} />
                    <Route path="/:title/:id" exact component={GameCardView} />
                    <Route path="/register" exact component={Register} />
                    <Route path="/login" exact component={Login} />
                    <Route path="*" exact component={NotFound} />
                </Switch>
            </AuthContext.Provider>
        </BrowserRouter>
    );

};

export default App;