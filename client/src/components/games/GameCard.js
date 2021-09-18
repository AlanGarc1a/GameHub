import React from 'react';
import { Button, Card, CardActions, CardContent, CardHeader, makeStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 350,
        height: '100%'
    },
    title: {
        marginBottom: 15
    },
    content: {
        fontSize: 14,
    },
    body: {
        height: '100px'
    },
    cardContent: {
        marginBottom: '20px'
    }
}));

const GameCard = (props) => {

    const classes  = useStyles();
    const { id, title, date, summary } = props;

    return (
        <Card className={classes.root}>
            <CardHeader
                title={title}
                subheader={date}
            />
            <CardContent className={classes.cardContent}>
                <div className={classes.body}>
                    <Typography component="p" className={classes.content}>
                        {summary}
                    </Typography>
                </div>
            </CardContent>
                <CardActions>
                <Link to={`/edit/${id}`}>
                    <Button color="primary">Edit</Button>
                </Link>
                <Link to={`/${title}/${id}`}>
                    <Button color="primary">View</Button>
                </Link>
            </CardActions>
        </Card>
    );
}

export default GameCard;