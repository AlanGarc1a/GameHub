import React from 'react';
import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, withStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const styles = theme => ({
    root: {
        maxWidth: 365,
        height: '100%'
    },
    media: {
        height: '350px',
        paddingTop: '1%',
        width: '100%',
        objectFit: 'fill'
    },
    title: {
        marginBottom: 15
    },
    content: {
        fontSize: 14,
    },
    body: {
        height: '100px'
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
                        title={title}
                        alt={title}
                        component="img"
                        image={image}
                    />
                    <CardContent>
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
            </div>
        );
    }
}

export default withStyles(styles)(GameCard);