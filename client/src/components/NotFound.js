import React from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const NotFound = () => {

    return (
        <Grid container direction="column" justify="center" alignItems="center" style={{ minHeight: '95vh' }}>
            <Typography variant="h1" style={ { marginBottom: '100px' } }>
                404 Page Not Found
            </Typography>
            <Link to="/">
                <Button variant="contained" color="primary">
                    Home
                </Button>
            </Link>
        </Grid>
    );
}

export default NotFound;