import React from 'react';
import { Grid, Button, TextField, withStyles, Typography, TextareaAutosize } from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

const styles = theme => ({
    center: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 15,
        marginBottom: 15,
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: 300,
    },
    inputSpace: {
        marginBottom: theme.spacing(2)
    },
    red: {
        borderColor: 'red',
        color: 'red'
    },
    rightSpace: {
        marginRight: 25
    }
});

class GameCardCreate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            date: '',
            image: '',
            body: '',
            redirect: false
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit = (event) => {
        event.preventDefault();

        const game = {
            title: this.state.title,
            date: this.state.date,
            image: this.state.image,
            body: this.state.body
        }
        console.log(game);

        axios.post("http://localhost:5000/g/create", game)
            .then( () => {
                this.setState({ redirect: true});
            })
            .catch( (error) => {
                console.log(error);
            });
        
            this.setState({
                title: '',
                date: '',
                image: '',
                body: ''
            });
    }

    render() {
        const { classes } = this.props;
        const { redirect } = this.state;

        if(redirect){
            return <Redirect to="/" />;
        }
        
        return (
            <div>
                <Grid container direction="column" justify="center" alignItems="center" style={{minHeight: '100vh'}}>
                    <Typography variant="h5">New Game</Typography>
                    <div className={classes.center}>
                        <form className={classes.form} onSubmit={this.onSubmit}>
                            <TextField 
                                size="small"
                                placeholder="title"
                                variant="outlined"
                                className={classes.inputSpace}
                                name='title'
                                value={this.state.title}
                                onChange={this.handleChange}
                            />
                            <TextField 
                                size="small"
                                placeholder="Released Date"
                                variant="outlined"
                                className={classes.inputSpace}
                                name='date'
                                value={this.state.date}
                                onChange={this.handleChange}
                            />
                            <TextField 
                                size="small"
                                placeholder="Image"
                                variant="outlined"
                                className={classes.inputSpace}
                                name='image'
                                value={this.state.image}
                                onChange={this.handleChange}
                            />
                            <TextareaAutosize
                                rowsMin={8}
                                rowsMax={8} 
                                size="small"
                                placeholder="Summary"
                                variant="outlined"
                                className={classes.inputSpace}
                                name='body'
                                value={this.state.body}
                                onChange={this.handleChange}
                            />
                            <Button color="primary" variant="outlined" type="submit">Submit</Button>
                        </form>
                    </div>
                    <Link to="/">
                        <Button variant="outlined" 
                                className={classes.red} >
                            Cancel
                        </Button>
                    </Link>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(GameCardCreate);