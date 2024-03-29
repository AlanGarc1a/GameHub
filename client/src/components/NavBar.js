import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, makeStyles, Button } from '@material-ui/core';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import { Link, useHistory } from 'react-router-dom';
import AuthContext from './store/AuthContext';
import axios from 'axios';

const useStyles = makeStyles({
    small: {
        width: '40px',
        height: '40px',
        marginRight: 15
    },
    title: {
        flexGrow: 1
    },
    icon: {
        marginRight: '10px'
    },
    link: {
        textDecoration: 'none',
        color: 'white',
        marginRight: '35px',
        fontSize: '20px',
        fontFamily: 'Roboto'
    },
});

const NavBar = () => {

    const { userData, setUserData } = useContext(AuthContext);

    const history = useHistory();

    const logoutHandler = async () => {

        const logoutRes = await axios.get(`/api/users/logout`);

        if(logoutRes.status === 200) {
            setUserData({
                user: undefined
            });
            history.replace('/login');
        }
    }

    const classes = useStyles();

    return (
        <div>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <SportsEsportsIcon classes={{ root: classes.icon }} />
                    <Typography variant="h6" classes={{ root: classes.title }} >
                        GameHub
                    </Typography>
                    {!userData.user && (
                        <Link to='/register'>
                            <Typography className={classes.link}>
                                Register
                            </Typography>
                        </Link>
                    )}
                    {userData.user && (
                        <Typography className={classes.link}>
                            {userData.user.username}
                        </Typography>
                    )}
                    {userData.user && (
                        <Button variant="contained" color="default" onClick={logoutHandler}>
                            Logout
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );

};

export default NavBar;