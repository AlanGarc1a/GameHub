import React from 'react';
import { AppBar, Avatar, Toolbar, Typography, makeStyles } from '@material-ui/core';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
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
}));

const NavBar = () => {

    const classes = useStyles();

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
                    <Avatar className={classes.small}/>
                    <Typography varaint="p">
                        Logout
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default NavBar;