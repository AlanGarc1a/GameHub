import React from 'react';
import { Card, CardActions, Grid, Typography, Button, withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';

const styles = theme => ({
    card: {
        width: '500px',
        height: '225px',
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
        paddingTop: theme.spacing(5),
    },
    img: {
        maxWidth: '100%',
        maxHeight: '100%',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat'
    },
    wordSpacing: {
        marginBottom: '5px'
    }
});

class GameCardView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            date: '',
            image: '',
            summary: ''
        }
    }

    componentDidMount() {
        const { id } = this.props.match.params;

        axios.get(`http://localhost:5000/g/${id}`)
            .then( res => {
                this.setState({
                    title: res.data.title,
                    date: res.data.date,
                    image: res.data.image,
                    summary: res.data.summary,
                });
                console.log(res);
            })
            .catch( error => {
                console.log('Error fetching game', error);
            });
    }

    render() {

        const { classes } = this.props;
        const { title, date, image, summary } = this.state;

        return (
            <div>
                <Grid container direction="row" justify="center" alignItems="center" style={ { minHeight: '95vh' } }>
                    <Grid item>
                        <div>
                            <img src={image}  className={classes.img} alt={title} />
                        </div>
                    </Grid>
                    <Grid item>
                        <Card className={classes.card}>
                            <Typography variant='subtitle1' className={classes.wordSpacing}>
                                {title}
                            </Typography>
                            <Typography variant='subtitle2' color='textSecondary' className={classes.wordSpacing}>
                                {date}
                            </Typography>
                            <Typography paragraph>
                                {summary}
                            </Typography>
                            <CardActions>
                                <Link to="/">
                                    <Button variant="contained" size="small" color="primary">
                                        Go Back
                                    </Button>
                                </Link>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(GameCardView);