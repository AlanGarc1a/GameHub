import React from 'react';
import { Card, Grid, Typography, Button, withStyles, CardContent, CardHeader } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AuthContext from '../store/AuthContext';
import axios from 'axios';

const styles = theme => ({
    card: {
        width: 450,
        height: '100%',
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingTop: theme.spacing(2),
    },
    wordSpacing: {
        marginBottom: theme.spacing(2)
    },
    button: {
        marginLeft: theme.spacing(2),
        marginBottom: theme.spacing(2)
    }
});

class GameCardView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            date: '',
            image: '',
            genre: '',
            summary: '',
            author: ''
        }
    }

    static contextType = AuthContext;

    componentDidMount() {
        const { id } = this.props.match.params;

        axios.get(`http://localhost:5000/api/games/${id}`)
            .then(res => {
                this.setState({
                    title: res.data.title,
                    date: res.data.date,
                    genre: res.data.genre,
                    image: res.data.image,
                    summary: res.data.summary,
                    author: res.data.author
                });
            })
            .catch(error => {
                console.log('Error fetching game', error);
            });
    }

    render() {

        const { classes } = this.props;
        const { title, date, genre, summary,author } = this.state;
        const { userData } = this.context;

        return (
            <div>
                { userData.user ?

                    <Grid container justify="center" alignItems="center" style={{ minHeight: '95vh' }}>
                        <Grid item>
                            <Card className={classes.card}>
                                <CardHeader 
                                    title={title}
                                    subheader={date}
                                />
                                <CardContent>
                                    <div>
                                        <Typography variant='subtitle2' color='textSecondary' paragraph>
                                            Created By: {author.username}
                                        </Typography>
                                        <Typography variant='subtitle2' color='textSecondary' className={classes.wordSpacing} paragraph>
                                            Genre: {genre}
                                        </Typography>
                                        <Typography paragraph>
                                            {summary}
                                        </Typography>
                                    </div>
                                </CardContent>
                                <Link to="/">
                                    <Button variant="contained" size="small" color="primary" className={classes.button}>
                                        Go Back
                                    </Button>
                                </Link>
                            </Card>
                        </Grid>
                    </Grid> :
                    <Grid container justify="center" alignItems="center" style={{ minHeight: '95vh' }}>
                        <Typography variant="h4">
                            You must be logged in to view your saved Games.
                        </Typography>
                    </Grid>
                }
            </div>
        );
    }
}

export default withStyles(styles)(GameCardView);