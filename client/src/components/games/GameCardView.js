import React, { useState, useEffect, useContext } from 'react';
import { Card, Grid, Typography, Button, makeStyles, CardContent, CardHeader } from '@material-ui/core';
import { Link, useParams } from 'react-router-dom';
import Header from '../Header';
import AuthContext from '../store/AuthContext';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
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
}));

const GameCardView = () => {

    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [genre, setGenre] = useState('');
    const [summary, setSummary] = useState('');
    const [author, setAuthor] = useState('');

    const { userData } = useContext(AuthContext);
    const { id } = useParams();
    const classes = useStyles();

    const fetchGame = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/games/${id}`);
            if(res.status === 200) {
                setTitle(res.data.title);
                setDate(res.data.date);
                setGenre(res.data.genre);
                setSummary(res.data.summary);
                setAuthor(res.data.author.username);
            }
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchGame();
    });

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
                                    Created By: {author}
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
            </Grid> : <Header />
        }
        </div>
    );
}

export default GameCardView;