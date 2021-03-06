import { useState, useContext } from "react";
import { Grid, Button, TextField, makeStyles, Typography, Container } from "@material-ui/core";
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
    title: {
        marginBottom: theme.spacing(3)
    },
    textField: {
        marginBottom: theme.spacing(3),
        marginRight: theme.spacing(5),
    },
    button: {
        marginRight: theme.spacing(3),
    }
}));

const GameCardCreate = () => {

    const [title, setTitle] = useState('');
    const [date, setDate] = useState(0);
    const [body, setBody] = useState('');
    const [genre, setGenre] = useState('Adventure');

    const [titleError, setTitleError] = useState(false);
    const [dateError, setDateError] = useState(false);
    const [bodyError, setBodyError] = useState(false);
    const [genreError, setGenreError] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const { userData } = useContext(AuthContext);

    const titleHandler = (event) => {
        event.persist();
        setTitle(event.target.value);
    };

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

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        const game = {
            title: title,
            date: date,
            genre: genre,
            body: body,
            author: userData.user._id
        };

        if (title === '') {
            setTitleError(true);
        }
        if (date === '') {
            setDateError(true);
        }
        if (body === '') {
            setBodyError(true);
        }
        if (genre === '') {
            setGenreError(true);
        }
        else {
            try {
                const createRes = await axios.post("http://localhost:5000/g/create", game);
                if (createRes.status === 200) {
                    setRedirect(true);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    const classes = useStyles();

    if (redirect) {
        return <Redirect to="/" />;
    }

    return (
        <div>
            {userData.user ?
                <>
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
                                New Game
                            </Typography>
                        </Grid>
                        <form onSubmit={onSubmitHandler}>
                            <Grid item>
                                <TextField
                                    label="Title"
                                    variant="outlined"
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
                                    variant="outlined"
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
                                    <Button variant="contained" color="default" className={classes.button}>
                                        Cancel
                                    </Button>
                                </Link>
                            </Grid>
                        </form>
                    </Grid>
                </Container></> :
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