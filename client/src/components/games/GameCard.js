import React from 'react';
import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, withStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const styles = theme => ({
    root: {
        maxWidth: 350,
        minHeight: 400
    },
    media: {
        height: '250px',
        paddingTop: '25'
    },
    title: {
        marginBottom: 15
    },
    content: {
        fontSize: 14,
    }
});

class GameCard extends React.Component {
    
    render() {
        const { classes } = this.props;
        const { id, title, date, image, summary } = this.props;

        return (
            <div>
                <Card className={classes.root}>
                    <CardHeader 
                        title={title}
                        subheader={date}
                    />
                    <CardMedia 
                        className={classes.media}
                        title="Game image"
                        alt="card image"
                        component="img"
                        image={image}
                    />
                    <CardContent>
                        <Typography component="p" className={classes.content}>
                            {summary}
                        </Typography>
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
            </div>
        );
    }
}

export default withStyles(styles)(GameCard);