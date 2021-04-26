import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, withStyles } from '@material-ui/core';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import { Link } from 'react-router-dom';

const styles = theme => ({
    small: {
        width: theme.spacing(4),
        height: theme.spacing(4),
        marginRight: 15
    },
    title: {
        flexGrow: 1
    },
    icon: {
        marginRight: '10px'
    },
    home: {
        textDecoration: 'none',
        color: 'white'
    }
});

class NavBar extends Component {
    constructor(props) {
        super();
    }
    
    render() {
        const { classes } = this.props;

        return (
            <div>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <SportsEsportsIcon className={classes.icon} />
                        <Typography variant="h6" className={classes.title} >
                            <Link to="/" className={classes.home}>
                                GameHub
                            </Link>
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
};

export default withStyles(styles)(NavBar);