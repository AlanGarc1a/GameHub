import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    render() {
        return (
            <div>
                <div>
                    <div>
                        <h1>Login</h1>
                        <span>Don't have an account yet?</span>
                        <Link to="/register">Sign in</Link>
                    </div>
                    <form>
                        <div>
                            <input placeholder="Username" />
                        </div>
                        <div>
                            <input placeholder="Password" />
                        </div>
                        <button>Login</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;