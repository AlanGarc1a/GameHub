import React from 'react';
import { Container, Grid, Button, withStyles, Typography } from '@material-ui/core';
import GameCard from './GameCard';
import { Link } from 'react-router-dom';
import axios from 'axios';

const styles = theme => ({
    add: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 50
    }
});

class GameList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            games: []
        }
    }

    componentDidMount = () => {
        axios.get('http://localhost:5000/api/games/')
            .then(res => {
                if(res.data.length > 0){
                    this.setState({ 
                        games: res.data 
                    });
                }
            })
            .catch(function(error){
                console.log(error);
            });
    }

    gameList = () => {
        return this.state.games.map( (game, i) => {
            return (
                <Grid item key={i}>
                    <GameCard
                        id={game._id} 
                        title={game.title} 
                        date={game.date}
                        image={game.image} 
                        summary={game.summary} />
                </Grid>
            );
        });
    }
    
    render() {
        const { classes } = this.props;
        const gameList = this.state.games;

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
                        { gameList ? this.gameList() : <Typography>No games</Typography> }
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default withStyles(styles)(GameList);