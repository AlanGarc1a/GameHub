import React, { useState, useContext, useEffect } from 'react';
import { Grid, TextField, Typography, makeStyles, Button, Dialog, DialogTitle, DialogContent, DialogActions, Container } from '@material-ui/core';
import { Link, Redirect, useParams } from 'react-router-dom';
import Header from '../Header';
import axios from 'axios';
import AuthContext from '../store/AuthContext';

const genres = [
    {
        key: 'Ad',
        label: 'Adventure'
    },
    {
        key: 'Ar',
        label: 'Arcade'
    },
    {
        key: 'Fi',
        label: 'Fighting'
    },
    {
        key: 'H',
        label: 'Horror'
    },
    {
        key: 'St',
        label: 'Strategy'
    },
    {
        key: 'Sh',
        label: 'Shooter'
    },
    {
        key: 'Pl',
        label: 'Platformer'
    },
    {
        key: 'Ot',
        label: 'Other'
    },
]

const useStyles = makeStyles((theme) => ({
    title: {
        marginBottom: theme.spacing(3)
    },
    textField: {
        marginBottom: theme.spacing(3)
    },
    button: {
        marginRight: theme.spacing(3)
    }
}));

const GameCardEdit = () => {

    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [genre, setGenre] = useState('');
    const [summary, setSummary] = useState('');
    const [author, setAuthor] = useState('');

    const [titleError, setTitleError] = useState(false);
    const [dateError, setDateError] = useState(false);
    const [genreError, setGenreError] = useState(false);
    const [summaryError, setSummaryError] = useState(false);

    const [open, setOpen] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const { id }  = useParams();

    const { userData } = useContext(AuthContext);

    const onTitleHandler = (event) => {
        event.persist();
        setTitle(event.target.value);
    }

    const onDateHandler = (event) => {
        event.persist();
        setDate(event.target.value);
    }

    const onGenreHandler = (event) => {
        event.persist();
        setGenre(event.target.value);
    }

    const onSummaryHandler = (event) => {
        event.persist();
        setSummary(event.target.value);
    }
    
    useEffect(() => {
        const fetchGame = async () => {
            try {
                const res = await axios.get(`/api/games/${id}`);
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

        fetchGame();

        return () => { setTitle(''); setDate(''); setGenre(''); setSummary(''); setAuthor('');  }
    }, [id]);

    const onSubmit = async (event) => {
        event.preventDefault();

        const game = {
            title: title,
            date: date,
            genre: genre,
            summary: summary,
        };

        if(title === '') {
            setTitleError(true);
        }
        else if(date === '') {
            setDateError(true);
        }
        else if(genre === '') {
            setGenreError(true);
        }
        else if(summary === '') {
            setSummaryError(true);
        }
        else {
            try {
                const res = await axios.put(`http://localhost:8000/api/games/update/${id}`, game);
                if(res.status === 200) {
                    setRedirect(true);
                }
            } catch(error) {
                console.log('Error updating game: ', error);
            }   
        }

    }

    const deleteGame = async () => {
        try {
            const res = await axios.delete(`http://localhost:8000/api/games/delete/${id}`);
            if(res.status === 200) {
                setRedirect(true);
                setOpen(false);
            }
        } catch(error) {
            console.log('Error deleting game: ', error);
        } 
    }

    const handleDialog = () => {
        setOpen(true);
    }

    const closeDialog = () => {
        setOpen(false);
    }

    const ShowDialog = () => {
        return (
            <Dialog onClose={closeDialog} open={open}>
                <DialogTitle onClose={closeDialog}>
                    Are you sure you want to delete this game?
                </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        {title}
                    </Typography>
                    <Typography gutterBottom>
                        Genre: {genre}
                    </Typography>
                    <Typography gutterBottom>
                        {summary}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" type="submit" onClick={deleteGame}>
                        Delete Game
                    </Button>
                    <Button color="default" type="submit" onClick={closeDialog}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    const classes = useStyles();

    if (redirect) {
        return <Redirect to="/" />
    }

    return (
        <div>
            { userData.user ?
                <>
                {ShowDialog()}
                <Container style={{ minHeight: '95vh' }}>
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                        style={{ minHeight: '95vh' }}
                    >
                        <Grid item>
                            <Typography variant="h5" align="center" className={classes.title}>
                                Update Game: {title}
                            </Typography>
                        </Grid>
                             <form onSubmit={onSubmit}>
                                <Grid item>
                                    <TextField
                                        label="Title"
                                        variant="outlined"
                                        size="small"
                                        error={titleError}
                                        name="title"
                                        value={title}
                                        onChange={onTitleHandler}
                                        fullWidth
                                        className={classes.textField}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        label="Year"
                                        variant="outlined"
                                        size="small"
                                        error={dateError}
                                        name="date"
                                        value={date}
                                        onChange={onDateHandler}
                                        fullWidth
                                        className={classes.textField}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="standard-select-genre-native"
                                        label='Genre'
                                        name="genre"
                                        value={genre}
                                        onChange={onGenreHandler}
                                        error={genreError}
                                        helperText="Please select genre"
                                        select
                                        fullWidth
                                        SelectProps={{
                                            native: true,
                                        }}
                                        className={classes.textField}
                                    >
                                            {genres.map(option => (
                                                <option key={option.key} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </TextField>
                                </Grid>
                                <Grid item>
                                    <TextField
                                        label="Summary"
                                        variant="outlined"
                                        size="small"
                                        error={summaryError}
                                        multiline
                                        rows={8}
                                        name="summary"
                                        value={summary}
                                        onChange={onSummaryHandler}
                                        fullWidth
                                        className={classes.textField}
                                    />
                                </Grid>
                                <Grid item>
                                    { 
                                        userData.user.username === author ?
                                        <>
                                        <Button variant="contained" color="primary" type="submit" className={classes.button}>
                                            Submit
                                        </Button>
                                        <Button variant="contained" color="secondary" className={classes.button} onClick={handleDialog}>
                                            Delete
                                        </Button>
                                        </>
                                        : <Typography variant="h6">
                                            You cannot update this game
                                        </Typography>
                                    }
                                    <Link to="/">
                                        <Button variant="contained" color="default" className={classes.button}>
                                            Cancel
                                        </Button>
                                    </Link>
                                </Grid>
                            </form>
                        </Grid>
                    </Container> </> : <Header />
                }
            </div>
        );
}

export default GameCardEdit;