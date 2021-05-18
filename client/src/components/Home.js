import React, { useContext } from 'react';
import AuthContext from './store/AuthContext';
import GameList from './games/GameList';
import { Typography, Grid } from '@material-ui/core';

const Home = () => {
    const { userData } = useContext(AuthContext);

    return (
        <div>
            {
                userData.user ? <GameList /> :
                    <Grid container justify="center" alignItems="center" style={{ minHeight: '95vh' }}>
                        <Grid item>
                            <Typography variant="h4" align="center">
                                You must be logged in to see your saved Games.
                            </Typography>
                        </Grid>
                    </Grid>
            }
        </div>
    );

}

export default Home;