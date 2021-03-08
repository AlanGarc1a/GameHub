import React from 'react';
import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, withStyles, Typography } from '@material-ui/core';

const styles = theme => ({
    root: {
        maxWidth: 350,
        minHeight: 400
    },
    media: {
        height: '200px',
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

        return (
            <div>
                <Card className={classes.root}>
                    <CardHeader 
                        title="Card Title"
                        subheader="release date"
                    />
                    <CardMedia 
                        className={classes.media}
                        title="Game image"
                        alt="card image"
                        component="img"
                        image="https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8d2Fyem9uZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                    />
                    <CardContent>
                        <Typography component="p" className={classes.content}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has 
                            been the industry's standard dummy text ever since the 1500s, when an unknown printer took a 
                            galley of type and scrambled it to make a type specimen book.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button color="primary">Edit</Button>
                        <Button color="primary">Learn More</Button>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default withStyles(styles)(GameCard);