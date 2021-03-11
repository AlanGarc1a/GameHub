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

    constructor(props){
        super(props);
    }
    
    render() {
        const { classes } = this.props;

        return (
            <div>
                <Card className={classes.root}>
                    <CardHeader 
                        title={this.props.title}
                        subheader="release date"
                    />
                    <CardMedia 
                        className={classes.media}
                        title="Game image"
                        alt="card image"
                        component="img"
                        image={this.props.image}
                    />
                    <CardContent>
                        <Typography component="p" className={classes.content}>
                            {this.props.summary}
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