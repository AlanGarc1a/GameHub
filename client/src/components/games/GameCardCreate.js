import { useState, useContext } from "react";
import { Grid, Button, TextField, makeStyles, Typography, Paper, Container } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import AuthContext from '../store/AuthContext';
import axios from "axios";

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
    paper: {
        paddingTop: '100px',
        paddingBottom: '100px',
        paddingLeft: '85px',
        paddingRight: '85px',
        width: '30%'
    },
    title: {
        marginBottom: theme.spacing(3)
    },
    textField: {
        marginBottom: theme.spacing(3)
    },
    button: {
        marginRight: theme.spacing(3),
    }
}));

const GameCardCreate = () => {

    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [date, setDate] = useState(0);
    const [body, setBody] = useState('');
    const [genre, setGenre] = useState('');

    const [titleError, setTitleError] = useState(false);
    const [dateError, setDateError] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [bodyError, setBodyError] = useState(false);
    const [genreError, setGenreError] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const { userData } = useContext(AuthContext);

    const titleHandler = (event) => {
        event.persist();
        setTitle(event.target.value);
    };

    const imageHandler = (event) => {
        event.persist();
        setImage(event.target.value);
    }

    const dateHandler = (event) => {
        event.persist();
        setDate(event.target.value);
    }

    const genreHandler = (event) => {
        event.persist();
        setGenre(event.target.value);
    }

    const bodyHandler = (event) => {
        event.persist();
        setBody(event.target.value);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        const game = {
            title: title,
            date: date,
            image: image,
            genre: genre,
            body: body,
        };

        if (title === '') {
            setTitleError(true);
        }
        if (date === '') {
            setDateError(true);
        }
        if (image === '') {
            setImageError(true);
        }
        if (body === '') {
            setBodyError(true);
        }
        if(genre === '') {
            setGenreError(true);
        }
        else {
            axios.post("http://localhost:5000/g/create", game)
                .then(() => {
                    setRedirect(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const classes = useStyles();

    if (redirect) {
        return <Redirect to="/" />;
    }

    return (
        <div>
            { userData.user ?
                <Container style={{ minHeight: '95vh' }}>
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                        style={{ minHeight: '95vh' }}
                    >
                        <Paper variant="elevation" elevation={6} className={classes.paper}>
                            <Grid item>
                                <Typography variant="h5" align="center" className={classes.title}>
                                    New Game
                                </Typography>
                            </Grid>
                            <form onSubmit={onSubmitHandler}>
                                <Grid item>
                                    <TextField
                                        label="Title"
                                        variant="filled"
                                        size="small"
                                        error={titleError}
                                        name="title"
                                        value={title}
                                        onChange={titleHandler}
                                        fullWidth
                                        className={classes.textField}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        label="Year"
                                        variant="filled"
                                        size="small"
                                        error={dateError}
                                        name="date"
                                        value={date}
                                        onChange={dateHandler}
                                        fullWidth
                                        className={classes.textField}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        label="Image"
                                        variant="filled"
                                        size="small"
                                        error={imageError}
                                        name="image"
                                        value={image}
                                        onChange={imageHandler}
                                        fullWidth
                                        className={classes.textField}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="standard-select-genre-native"
                                        label='Genre'
                                        value={genre}
                                        onChange={genreHandler}
                                        error={genreError}
                                        helperText="Please select genre"
                                        select
                                        fullWidth
                                        SelectProps={{
                                            native: true,
                                        }}
                                        className={classes.textField}
                                    >
                                        {genres.map( option => (
                                                <option key={option.key} value={option.value}>
                                                    {option.label}
                                                </option>
                                        ))}
                                    </TextField>        
                                </Grid>
                                <Grid item>
                                    <TextField
                                        label="Summary"
                                        variant="filled"
                                        size="small"
                                        error={bodyError}
                                        multiline
                                        rows={8}
                                        name="body"
                                        value={body}
                                        onChange={bodyHandler}
                                        fullWidth
                                        className={classes.textField}
                                    />
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" color="primary" type="submit" className={classes.button}>
                                        Submit
                                    </Button>
                                    <Link to="/">
                                        <Button variant="contained" color="default">
                                            Cancel
                                        </Button>
                                    </Link>
                                </Grid>
                            </form>
                        </Paper>
                    </Grid>
                </Container> :
                <Grid container justify="center" alignItems="center" style={{ minHeight: '95vh' }}>
                    <Typography variant="h4">
                        You must be logged in to create a Game.
                    </Typography>
                </Grid>
            }
        </div>
    );
}

export default GameCardCreate;