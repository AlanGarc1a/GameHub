import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../store/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { Button, Container, Grid, makeStyles, Typography, Paper, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    textField: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(1)
    },
    submitButton: {
        marginTop: '50px'
    },
    loginButton: {
        marginLeft: '25px',
        fontSize: '15px'
    },
    login: {
        marginTop: theme.spacing(1)
    },
    paper: {
        padding: '100px'
    }
}));

const UserForm = () => {

    const [nameInput, setName] = useState('');
    const [emailInput, setEmail] = useState('');
    const [passwordInput, setPassword] = useState('');

    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [registerError, setRegisterError] = useState(false);

    const history = useHistory();

    const { setUserData } = useContext(AuthContext);

    const classes = useStyles();

    const submitHandler = async (event) => {
        event.preventDefault();

        try {
            const newUser = {
                username: nameInput,
                email: emailInput,
                password: passwordInput
            };
    
            if (nameInput === '') {
                setNameError(true);
            }
            else if (emailInput === '') {
                setEmailError(true);
            }
            else if (passwordInput === '') {
                setPasswordError(true);
            }
            else {
                const registerRes = await axios.post('http://localhost:5000/api/users/register', newUser);
                
                setUserData({
                    user: registerRes.data,
                });

                history.replace('/');
            }
        } catch(error) {
            setRegisterError(true);
        }
    }

    const nameHandler = (event) => {
        event.persist();
        setName(event.target.value);
    }

    const emailHandler = (event) => {
        event.persist();
        setEmail(event.target.value);
    }

    const passwordHandler = (event) => {
        event.persist();
        setPassword(event.target.value);
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
                            <Typography variant="h5" align="center">
                                Register
                            </Typography>
                            { registerError && <Typography style={{color: 'red', marginBottom: '10px' }}>Username/email taken already</Typography>}
                        </Grid>
                        <form onSubmit={submitHandler}>
                            <Grid item>
                                <TextField 
                                    label="Username" 
                                    type="text" 
                                    name="username" 
                                    value={nameInput} 
                                    error={nameError} 
                                    className={classes.textField} 
                                    onChange={nameHandler} 
                                />
                            </Grid>
                            <Grid item>
                                <TextField 
                                    label="Email" 
                                    type="email" 
                                    name="email" 
                                    value={emailInput} 
                                    error={emailError} 
                                    className={classes.textField} 
                                    onChange={emailHandler} 
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
                                        }}>
                                        Submit
                                </Button>
                                </div>
                            </Grid>
                        </form>
                    </Paper>
                    <Grid item>
                        <Typography classes={{ root: classes.login }}>
                            Already have an account?
                            <Link to="/login">
                                <Button
                                    classes={{
                                        root: classes.loginButton
                                    }}>
                                    Login
                                </Button>
                            </Link>
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default UserForm;