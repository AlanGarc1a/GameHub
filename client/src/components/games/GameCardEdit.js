import React from 'react';
import { Grid, TextField, Typography, withStyles, Button, Dialog, DialogTitle, DialogContent, DialogActions, Container } from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../store/AuthContext';

const styles = theme => ({
    title: {
        marginBottom: theme.spacing(3)
    },
    textField: {
        marginBottom: theme.spacing(3)
    },
    button: {
        marginRight: theme.spacing(3),
    }
});

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

class GameCardEdit extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            date: '',
            image: '',
            genre: '',
            summary: '',
            author: '',
            open: false
        }
    }

    static contextType = AuthContext;

    componentDidMount = () => {
        const { id } = this.props.match.params;

        axios.get(`http://localhost:5000/g/${id}`)
            .then(res => {
                this.setState({
                    title: res.data.title,
                    date: res.data.date,
                    image: res.data.image,
                    genre: res.data.genre,
                    summary: res.data.summary,
                    author: res.data.author.username
                });
            })
            .catch(error => {
                console.log(error);
            })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onSubmit = async (event) => {
        event.preventDefault();
        const { id } = this.props.match.params;

        const game = {
            title: this.state.title,
            date: this.state.date,
            image: this.state.image,
            genre: this.state.genre,
            summary: this.state.summary,
        };

        try {
            const res = await axios.put(`http://localhost:5000/g/update/${id}`, game);
            if(res.status === 200) {
                this.setState({
                    redirect: true
                });
            }
        } catch(error) {
            console.log('Error updating game: ' ,error);
        }   
    }

    deleteGame = async () => {
        const { id } = this.props.match.params;

        try {
            const res = await axios.delete(`http://localhost:5000/g/delete/${id}`);
            if(res.status === 200) {
                this.setState({
                    redirect: true,
                    open: false
                });
            }
        } catch(error) {
            console.log('Error deleting game: ', error);
        } 
    }

    handleDialog = () => {
        this.setState({ open: true });
    }

    closeDialog = () => {
        this.setState({ open: false });
    }

    ShowDialog = () => {
        return (
            <Dialog onClose={this.closeDialog} open={this.state.open}>
                <DialogTitle onClose={this.closeDialog}>
                    Are you sure you want to delete this game?
                </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        {this.state.title}
                    </Typography>
                    <Typography gutterBottom>
                        Genre: {this.state.genre}
                    </Typography>
                    <Typography gutterBottom>
                        {this.state.summary}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" type="submit" onClick={this.deleteGame}>
                        Delete Game
                    </Button>
                    <Button color="default" type="submit" onClick={this.closeDialog}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    render() {

        const { classes } = this.props;
        const { redirect, title, date, image, genre, summary, author } = this.state;

        if (redirect) {
            return <Redirect to="/" />
        }

        const { userData } = this.context;

        return (
            <div>
                { userData.user ?
                    <>
                    {this.ShowDialog()}
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
                                <form onSubmit={this.onSubmit}>
                                    <Grid item>
                                        <TextField
                                            label="Title"
                                            variant="outlined"
                                            size="small"
                                            error={this.state.titleError}
                                            name="title"
                                            value={title}
                                            onChange={this.handleChange}
                                            fullWidth
                                            className={classes.textField}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            label="Year"
                                            variant="outlined"
                                            size="small"
                                            error={this.state.dateError}
                                            name="date"
                                            value={date}
                                            onChange={this.handleChange}
                                            fullWidth
                                            className={classes.textField}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            label="Image"
                                            variant="outlined"
                                            size="small"
                                            error={this.state.imageError}
                                            name="image"
                                            value={image}
                                            onChange={this.handleChange}
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
                                            onChange={this.handleChange}
                                            error={this.state.genreError}
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
                                            error={this.state.bodyError}
                                            multiline
                                            rows={8}
                                            name="summary"
                                            value={summary}
                                            onChange={this.handleChange}
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
                                            <Button variant="contained" color="secondary" className={classes.button} onClick={this.handleDialog}>
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
                    </Container> </> :
                    <Grid container justify="center" alignItems="center" style={{ minHeight: '95vh' }}>
                        <Typography variant="h4">
                            You must be logged in to create a Game.
                        </Typography>
                    </Grid>
                }
            </div>
        );
    }
}

export default withStyles(styles)(GameCardEdit);