import React, { Component } from 'react';
import { Grid , TextField, Button, Typography} from '@material-ui/core';
import { Link } from 'react-router-dom';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullname: '',
            username: '',
            email: '',
            password: ''
        };
    }

    handleChange = (e) => {
        e.preventDefault();

        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <div>
                <Grid container direction="column" alignItems="center" justify="center" style={{minHeight: '100vh'}}>
                    <Typography variant="h4">Register</Typography>
                    <Grid item>
                        <div>
                            <form style={{ display: 'flex', flexDirection: 'column', margin: '20px'}}>
                                <TextField
                                    size="small" 
                                    id="outlined-basic" 
                                    label="Full Name" 
                                    variant="outlined" 
                                    style={{margin: '5px'}} />
                                <TextField
                                    size="small" 
                                    id="outlined-basic" 
                                    label="Email" 
                                    variant="outlined" 
                                    style={{margin: '5px'}} />
                                <TextField
                                    size="small" 
                                    id="outlined-basic" 
                                    label="Username" 
                                    variant="outlined" 
                                    style={{margin: '5px'}} />
                                <TextField
                                    size="small" 
                                    id="outlined-basic" 
                                    label="Password" 
                                    variant="outlined" 
                                    style={{margin: '5px', marginBottom: '25px'}} />
                            
                                <Button variant="contained" color="primary">
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