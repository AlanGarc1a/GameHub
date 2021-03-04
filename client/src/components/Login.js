import React, { Component } from 'react';
import { Grid , TextField, Button, Typography } from '@material-ui/core';
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
                <Grid container direction="column" alignItems="center" justify="center" style={{minHeight: '100vh'}}>
                    <Typography variant="h4">Login</Typography>
                    <Grid item>
                        <div>
                            <form style={{ display: 'flex', flexDirection: 'column', margin: '25px'}}>
                                <TextField
                                    size="small" 
                                    id="outlined-basic" 
                                    label="Username" 
                                    variant="outlined" 
                                    style={{margin: '5px'}}/>
                                <TextField
                                    size="small" 
                                    id="outlined-basic" 
                                    label="Password" 
                                    variant="outlined" 
                                    style={{margin: '5px', marginBottom: '25px'}}/>
                            
                                <Button variant="contained" color="primary">
                                    Log In
                                </Button>
                            </form>
                        </div>
                    </Grid>
                    <Grid item>
                        <Typography component="p">
                            Don't have an account yet?
                            <Link to="/register" style={{textDecoration: 'none', color: 'blue'}}>
                                Sign in
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

export default Login;