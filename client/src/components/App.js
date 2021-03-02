import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

const App = () => {

    return (
        <div>
            <BrowserRouter>
                <div>
                    <Route path="/login" exact component={Login} />
                    <Route path="/register" exact component={Register} />
                </div>
            </BrowserRouter>
        </div>
    );
};

export default App;