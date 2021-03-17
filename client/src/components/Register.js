import React, { Component } from 'react';
import { Grid , TextField, Button, Typography} from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullname: '',
            username: '',
            password: '',
            redirect: false
        };
    }

    handleName = (event) => {
        this.setState({fullname: event.target.value});
    }

    handleUsername = (event) => {
        this.setState({username: event.target.value});
    }

    handlePassword = (event) => {
        this.setState({password: event.target.value});
    }

    validateUser = () => {
        let isError = false;
        const errors = {
            fullnameError: "",
            usernameError: "",
            passwordError: "",
            nameError: false,
            unError: false,
            pwError: false,
        };

        if(this.state.fullname === ''){
            isError = true;
            errors.fullnameError = "Cannot have an empty username";
            errors.nameError = true;
        }
        if(this.state.username === ''){
            isError = true;
            errors.usernameError = "Cannot have an empty username";
            errors.unError = true;
        }
        if(this.state.password !== ''){
            if(this.state.password.length < 6) {
                isError = true;
                errors.passwordError = "Password must be at least 6 characters long";
                errors.pwError = true;
            }
        }

        this.setState({...this.state, ...errors});
        
        return isError;
    }

    submitUser = (event) => {
        event.preventDefault();

        const user = {
            fullname: this.state.fullname,
            username: this.state.username,
            password: this.state.password
        };

        const error = this.validateUser();

        if(error){
            this.setState({
                fullname: this.state.fullname,
                username: this.state.username,
                password: this.state.password,
            });
        }
        else {
            axios.post('http://localhost:5000/user/register', user)
                 .then( res => {
                    console.log('user register');
                    this.setState({ redirect: true});
                 })
                 .catch( error => {
                     console.log(error);
                 })
            
                 this.setState({
                    fullname: '',
                    username: '',
                    password: ''
                 });
        }
    }

    render() {

        const { redirect } = this.state;

        if(redirect) {
            <Redirect to="/" />
        }
        return (
            <div>
                <Grid container direction="column" alignItems="center" justify="center" style={{minHeight: '100vh'}}>
                    <Typography variant="h4">Register</Typography>
                    <Grid item>
                        <div>
                            <form
                                onSubmit={this.submitUser} 
                                style={{ display: 'flex', flexDirection: 'column', margin: '20px'}}
                                >
                                <TextField
                                    type="text"
                                    error={this.state.nameError}
                                    size="small" 
                                    id="outlined-basic" 
                                    label="Full Name" 
                                    variant="outlined" 
                                    style={{margin: '5px'}}
                                    helperText={this.state.fullnameError} 
                                    name="Full Name"
                                    value={this.state.fullname}
                                    onChange={this.handleName} />
                                <TextField
                                    type="text"
                                    error={this.state.unError}
                                    size="small" 
                                    id="outlined-basic" 
                                    label="Username" 
                                    variant="outlined" 
                                    style={{margin: '5px'}}
                                    helperText={this.state.usernameError} 
                                    name="Username"
                                    value={this.state.username}
                                    onChange={this.handleUsername} />
                                <TextField
                                    type="password"
                                    error={this.state.pwError}
                                    size="small" 
                                    id="outlined-basic" 
                                    label="Password" 
                                    variant="outlined" 
                                    style={{margin: '5px', marginBottom: '25px'}}
                                    helperText={this.state.passwordError} 
                                    name="Password"
                                    value={this.state.password}
                                    onChange={this.handlePassword} />
                            
                                <Button variant="contained" color="primary" type="submit">
                                    register
                                </Button>
                            </form>
                        </div>
                    </Grid>
                    <Grid item>
                        <Typography component="p">
                            Already have an account?
                            <Link to="/login" style={{textDecoration: 'none', color: 'blue'}}>
                                Log in
                            </Link>
                        </Typography>
                    </Grid>
                    <Typography component="p" style={{ marginTop: '10px'}}>
                        &copy; GameHub 2021
                    </Typography>
                </Grid>
            </div>
        );
    }
}

export default Register;