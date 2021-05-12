import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'; 
import axios from 'axios';
import { Button, Container, FormControl, Grid, Input, InputLabel, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
    submitButton: {
        marginTop: '50px'
    },
    loginButton: {
        marginLeft: '25px',
        fontSize: '15px'
    },
    login: {
        marginTop: '25px'
    }
});

const Login = () => {

    const emailInput = useRef();
    const passwordInput = useRef();

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const history = useHistory();

    const classes = useStyles();

    const submitHandler = (event) => {
        event.preventDefault();

        const existingUser = {
            email: emailInput.current.value,
            password: passwordInput.current.value
        };

        if(emailInput.current.value === '') {
            setEmailError(true);
        }
        if(passwordInput.current.value === '') {
            setPasswordError(true);
        }
        else {
            axios.post('http://localhost:5000/u/login', existingUser)
                 .then( res => {
                    console.log(res);
                    history.replace('/');
                 })
                 .catch( error => {
                     console.log(error);
                 });
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
                    <Grid item>
                        <Typography variant="h5">
                            Login
                        </Typography>
                    </Grid>
                    <form onSubmit={submitHandler}>
                        <Grid item>
                            <FormControl margin="normal" variant="outlined" required error={emailError}>
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <Input id="email" type="email" ref={emailInput} />
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <FormControl margin="normal" variant="outlined" required error={passwordError}>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input id="password" type="password" ref={passwordInput} />
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <div>
                                <Button 
                                    color="primary" 
                                    variant="contained"
                                    classes={{
                                        root: classes.submitButton
                                    }}
                                    >
                                    Submit
                                </Button>
                            </div>
                        </Grid>
                    </form>
                    <Grid item>
                        <Typography classes={{ root: classes.login}}>
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