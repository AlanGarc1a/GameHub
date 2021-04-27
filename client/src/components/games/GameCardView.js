import React from 'react';
import { Card, CardActions, Grid, Typography, Button, withStyles, CardContent } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';

const styles = theme => ({
    card: {
        width: '500px',
        height: '325px',
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
        paddingTop: theme.spacing(5),
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
            .then(res => {
                this.setState({
                    title: res.data.title,
                    date: res.data.date,
                    image: res.data.image,
                    summary: res.data.summary,
                });
                console.log(res);
            })
            .catch(error => {
                console.log('Error fetching game', error);
            });
    }

    render() {

        const { classes } = this.props;
        const { title, date, summary } = this.state;

        return (
            <div>
                <Grid container direction="row" justify="center" alignItems="center" style={{ minHeight: '95vh' }}>
                    <Grid item>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography variant='subtitle1' className={classes.wordSpacing}>
                                    {title}
                                </Typography>
                                <Typography variant='subtitle2' color='textSecondary' className={classes.wordSpacing}>
                                    {date}
                                </Typography>
                                <Typography paragraph>
                                    {summary}
                                </Typography>
                            </CardContent>
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