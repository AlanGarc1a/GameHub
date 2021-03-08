import React from 'react';
import { Container, Grid, Button, makeStyles } from '@material-ui/core';
import GameCard from './GameCard';
import { Link } from 'react-router-dom';

const GameList = () => {

    const useStyles = makeStyles( (theme) => ({
        add: {
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 50
        }
    }));

    const classes = useStyles();

    return (

        <div>
            <Container style={{marginTop: '50px'}}>
                <div className={classes.add}>
                    <div>
                        <Link to="/create">
                            <Button variant="outlined" color="primary">
                                Create New Game
                            </Button>
                        </Link>
                    </div>
                </div>
                <Grid container justify="center" spacing={4}>
                    <Grid item>
                        <GameCard />
                    </Grid>
                    <Grid item>
                        <GameCard />
                    </Grid>
                    <Grid item>
                        <GameCard />
                    </Grid>
                    <Grid item>
                        <GameCard />
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default GameList;