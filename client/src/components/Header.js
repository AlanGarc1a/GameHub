import React from 'react';
import { Typography, Grid } from '@material-ui/core';

const Header = () => {

    return (
        <Grid container justify="center" alignItems="center" style={{ minHeight: '95vh' }}>
            <Grid item>
                <Typography align='center' variant='h2' paragraph>
                    Welcome to GameHub.
                </Typography>
                <Typography variant="h5" paragraph align='center'>
                    GameHub lets you save your favorite games, update, view them,
                    and see other people's saved games.
                </Typography>
                <Typography variant="h5" align='center'>
                    To start, you must create an account or login to you existing account.
                </Typography>
            </Grid>
        </Grid>
    )
}

export default Header;