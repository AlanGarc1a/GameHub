import React from 'react';
import { Grid, Paper, TextField, Typography, withStyles, Button } from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

const styles = theme => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        width: '500px'
    },
    formTitle: {
        textAlign: 'center',
        padding: '25px 0px 25px 0px'
    },
    textField: {
        marginBottom: theme.spacing(1),
        marginLeft: theme.spacing(5),
        marginRight: theme.spacing(5),
    },
    textFieldArea: {
        marginBottom: theme.spacing(5),
        marginLeft: theme.spacing(5),
        marginRight: theme.spacing(5),
    },
    submitButton: {
        margin: '0px 0px 50px 50px',
    },
    cancelButton: {
        margin: '0px 0px 50px 25px',
    }
});

class GameCardEdit extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            date: '',
            image: '',
            summary: '',
        }
    }

    componentDidMount = () => {
        const { id } = this.props.match.params;

        axios.get(`http://localhost:5000/g/${id}`)
            .then(res => {
                this.setState({
                    title: res.data.title,
                    date: res.data.date,
                    image: res.data.image,
                    summary: res.data.summary,
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

    onSubmit = (event) => {
        event.preventDefault();
        const { id } = this.props.match.params;

        const game = {
            title: this.state.title,
            date: this.state.date,
            image: this.state.image,
            summary: this.state.summary
        };

        axios.put(`http://localhost:5000/g/update/${id}`, game)
            .then(res => {
                console.log('Game updated successfully')
                this.setState({
                    redirect: true
                });
            })
            .catch(error => {
                console.log(error)
            });
    }

    deleteGame = () => {
        const { id } = this.props.match.params;

        axios.delete(`http://localhost:5000/g/delete/${id}`)
            .then(res => {
                console.log(res);
                this.setState({ redirect: true });
            })
            .catch(error => { console.log(error) });
    }

    render() {

        const { classes } = this.props;
        const { redirect, title, date, image, summary } = this.state;

        if (redirect) {
            return <Redirect to="/" />
        }

        return (
            <div>
                <Grid container direction="column" justify="center" alignItems="center" style={{ minHeight: '95vh' }}>
                    <Grid item xs={12} md={6} sm={12} xl={12} lg={12}>
                        <Paper variant="elevation" elevation={3}>
                            <Typography variant="h5" className={classes.formTitle}>
                                Edit Game
                            </Typography>
                            <form onSubmit={this.onSubmit} className={classes.form}>
                                <TextField
                                    className={classes.textField}
                                    label="Title"
                                    variant="filled"
                                    size="small"
                                    error={this.state.errorTitle}
                                    helperText={this.state.titleError}
                                    name="title"
                                    value={title}
                                    onChange={this.handleChange}
                                />

                                <TextField
                                    className={classes.textField}
                                    label="Date"
                                    variant="filled"
                                    size="small"
                                    error={this.state.errorDate}
                                    helperText={this.state.dateError}
                                    name="date"
                                    value={date}
                                    onChange={this.handleChange}
                                />
                                <TextField
                                    className={classes.textField}
                                    label="Image"
                                    variant="filled"
                                    size="small"
                                    error={this.state.errorImage}
                                    helperText={this.state.imageError}
                                    name="image"
                                    value={image}
                                    onChange={this.handleChange}
                                />
                                <TextField
                                    className={classes.textFieldArea}
                                    label="Summary"
                                    variant="filled"
                                    size="small"
                                    error={this.state.errorBody}
                                    helperText={this.state.bodyError}
                                    multiline
                                    rows={8}
                                    name="body"
                                    value={summary}
                                    onChange={this.handleChange}
                                />
                                <div>
                                    <Button variant="contained" color="primary" type="submit" className={classes.submitButton}>
                                        Update
                                    </Button>
                                    <Button variant="contained" color="secondary" className={classes.cancelButton} onClick={this.deleteGame}>
                                        Delete
                                    </Button>
                                    <Link to="/">
                                        <Button variant="contained" className={classes.cancelButton}>
                                            Cancel
                                        </Button>
                                    </Link>
                                </div>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(GameCardEdit);