import React from 'react';
import { Grid, Button, TextField, withStyles, Typography, TextareaAutosize } from '@material-ui/core';
import { Link } from 'react-router-dom';

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

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Grid container direction="column" justify="center" alignItems="center" style={{minHeight: '100vh'}}>
                    <Typography variant="h5">New Game</Typography>
                    <div className={classes.center}>
                        <form className={classes.form}>
                            <TextField 
                                size="small"
                                placeholder="title"
                                variant="outlined"
                                className={classes.inputSpace}
                            />
                            <TextField 
                                size="small"
                                placeholder="Released Date"
                                variant="outlined"
                                className={classes.inputSpace}
                            />
                            <TextareaAutosize
                                rowsMin={8}
                                rowsMax={8} 
                                size="small"
                                placeholder="Summary"
                                variant="outlined"
                                className={classes.inputSpace}
                            />
                        </form>
                    </div>
                    <div className={classes.center}>
                        <div className={classes.rightSpace}>
                            <Link to="/create">
                                <Button variant="outlined" color="primary">
                                    Submit
                                </Button>
                            </Link>
                        </div>
                        <div>
                            <Link to="/">
                                <Button variant="outlined" className={classes.red}>
                                    Cancel
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(GameCardCreate);