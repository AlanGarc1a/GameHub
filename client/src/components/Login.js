import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import AuthContext from './store/AuthContext';
import { Button, Container, TextField, Grid, makeStyles, Typography, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    textField: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2)
    },
    submitButton: {
        marginTop: '50px'
    },
    loginButton: {
        marginLeft: '25px',
        fontSize: '15px'
    },
    login: {
        marginTop: '25px'
    },
    paper: {
        padding: '100px'
    }
}));

const Login = () => {

    const [usernameInput, setUsername] = useState('');
    const [passwordInput, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [userNameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [loginError, setLoginError] = useState(false);

    const { setUserData } = useContext(AuthContext);

    const history = useHistory();

    const classes = useStyles();

    const usernameHandler = (event) => {
        event.persist();
        setUsername(event.target.value);
    }

    const passwordHandler = (event) => {
        event.persist();
        setPassword(event.target.value);
    }

    const submitHandler =  async (event) => {
        event.preventDefault();

        try {
            const existingUser = {
                username: usernameInput,
                password: passwordInput
            };
    
            if (usernameInput === '') {
                setUsernameError(true);
            }
            else if (passwordInput === '') {
                setPasswordError(true);
            }
            else {
                const loginResponse = await axios.post('http://localhost:8000/api/users/login', existingUser);
    
                setUserData({
                    user: loginResponse.data
                });
                
                history.replace("/");
            }
        } catch(error) {
            error.response.data = 'Invalid username or password';
            setLoginError(true);
            setErrorMessage(error.response.data);
        }

    }

    return (
        <div>
            <Container maxWidth='sm'>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    style={{ minHeight: '95vh' }}
                >
                    <Paper elevation={6} variant="elevation" classes={{root: classes.paper}}>
                        <Grid item>
                            <Typography variant="h5" align='center'>
                                Login
                            </Typography>
                            {loginError && <Typography style={{color: 'red', marginBottom: '10px'}}>{errorMessage}</Typography>}
                        </Grid>
                        <form onSubmit={submitHandler}>
                            <Grid item>
                                <TextField 
                                    label="username" 
                                    type="text"
                                    name="username"
                                    value={usernameInput}
                                    error={userNameError}
                                    className={classes.textField}
                                    onChange={usernameHandler} 
                                    />
                            </Grid>
                            <Grid item>
                                <TextField 
                                    label="Password" 
                                    type="password"
                                    name="password"
                                    value={passwordInput}
                                    error={passwordError}
                                    className={classes.textField}
                                    onChange={passwordHandler} 
                                    />
                            </Grid>
                            <Grid item>
                                <div>
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        type="submit"
                                        classes={{
                                            root: classes.submitButton
                                        }}
                                    >
                                        Submit
                                </Button>
                                </div>
                            </Grid>
                        </form>
                    </Paper>
                    <Grid item>
                        <Typography classes={{ root: classes.login }}>
                            New to GameHub?
                            <Link to="/register">
                                <Button
                                    classes={{
                                        root: classes.loginButton
                                    }}
                                >Register
                                </Button>
                            </Link>
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default Login;