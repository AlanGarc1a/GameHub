import React from "react";
import { Grid, Button, TextField, withStyles, Typography, Paper } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

const styles = (theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
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
        //width: '100px'
    },
    cancelButton: {
        margin: '0px 0px 50px 25px'
    }
});

class GameCardCreate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            titleError: "",
            image: "",
            imageError: "",
            date: "",
            dateError: "",
            body: "",
            bodyError: "",
            redirect: false,
            submitted: false
        };
    }

    validate = () => {
        let isError = false;

        const errors = {
            titleError: "",
            dateError: "",
            imageError: "",
            bodyError: "",
            errorTitle: false,
            errorDate: false,
            errorImage: false,
            errorBody: false,
        };

        if (this.state.title === "") {
            isError = true;
            errors.titleError = "Cannot have empty title";
            errors.errorTitle = true;
        }
        if (this.state.date === "") {
            isError = true;
            errors.dateError = "Cannot have empty date";
            errors.errorDate = true;
        }
        if (this.state.image === "") {
            isError = true;
            errors.imageError = "Cannot have empty image";
            errors.errorImage = true;
        }
        if (this.state.body === "") {
            isError = true;
            errors.bodyError = "Cannot have empty body";
            errors.errorBody = true;
        }

        this.setState({ ...this.state, ...errors });

        return isError;
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    onSubmit = (event) => {
        event.preventDefault();

        const error = this.validate();

        const game = {
            title: this.state.title,
            date: this.state.date,
            image: this.state.image,
            body: this.state.body,
        };

        if (error) {
            this.setState({
                title: "",
                titleError: "",
                date: "",
                dateError: "",
                image: "",
                imageError: "",
                body: "",
                bodyError: ""
            });
        }
        else {
            axios.post("http://localhost:5000/g/create", game)
                .then(() => {
                    this.setState({ redirect: true, submitted: true });
                })
                .catch((error) => {
                    console.log(error);
                });

            this.setState({
                title: "",
                date: "",
                image: "",
                body: "",
            });
        }
    };

    render() {
        const { classes } = this.props;
        const { redirect, submitted, title, date, image, body } = this.state;

        if (redirect && submitted) {
            return <Redirect to="/" />;
        }

        return (
            <div>
                <Grid container direction="column" justify="center" alignItems="center" style={{ minHeight: '95vh' }}>
                    <Grid item xs={12} sm={6}>
                        <Paper variant="elevation" elevation={3}>
                            <Typography variant="h5" className={classes.formTitle}>
                                New Game
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
                                    value={body}
                                    onChange={this.handleChange}
                                />
                                <div>
                                    <Button variant="contained" color="primary" type="submit" className={classes.submitButton}>
                                        Submit
                                    </Button>
                                    <Link to="/">
                                        <Button variant="contained" color="secondary" className={classes.cancelButton}>
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

export default withStyles(styles)(GameCardCreate);
