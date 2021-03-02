import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

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
                <Grid justify="center">
                    <div>
                        Content
                    </div>
                    <div>
                        Content
                    </div>
                </Grid>
            </div>
        );
    }
}

export default Register;