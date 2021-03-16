import React from "react";
import {
  Grid,
  Button,
  TextField,
  withStyles,
  Typography,
} from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

const styles = (theme) => ({
  center: {
    display: "flex",
    justifyContent: "center",
    marginTop: 15,
    marginBottom: 15,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: 300,
  },
  inputSpace: {
    marginBottom: theme.spacing(2),
  },
  red: {
    borderColor: "red",
    color: "red",
  },
  rightSpace: {
    marginRight: 25,
  },
});

class GameCardCreate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
     title: "",
     titleError: "",
     date: "",
     dateError: "",
     image: "",
     imageError: "",
     body: "",
     bodyError: "",
     submiited: false,
     redirect: false
    };
  }

  validate = () => {
    let isError = false;
    const errors = {
        titleError: "",
        dateError: "",
        imageError: "",
        bodyError: "",
        errorTitle: false,
        errorDate: false,
        errorImage: false,
        errorBody: false,
    };

    if (this.state.title === "") {
      isError = true;
      errors.titleError = "Cannot have empty title";
      errors.errorTitle = true;
    }
    if (this.state.date === "") {
      isError = true;
      errors.dateError = "Cannot have empty date";
      errors.errorDate = true;
    }
    if (this.state.image === "") {
      isError = true;
      errors.imageError = "Cannot have empty image";
      errors.errorImage = true;
    }
    if (this.state.body === "") {
      isError = true;
      errors.bodyError = "Cannot have empty body";
      errors.errorBody = true;
    }
   
    this.setState({ ...this.state, ...errors });

    return isError;
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();

    const error = this.validate();

    const game = {
      title: this.state.title,
      date: this.state.date,
      image: this.state.image,
      body: this.state.body,
    };

    if(error) {
        this.setState({
            title: "",
            titleError: "",
            date: "",
            dateError: "",
            image: "",
            imageError: "",
            body: "",
            bodyError: ""
        });
    } 
    else {
        axios.post("http://localhost:5000/g/create", game)
          .then(() => {
            this.setState({ redirect: true, submitted: true });
          })
          .catch((error) => {
            console.log(error);
          });
    
        this.setState({
          title: "",
          date: "",
          image: "",
          body: "",
        });
    }
  };

  render() {
    const { classes } = this.props;
    const { redirect, submitted } = this.state;

    if (redirect && submitted) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          style={{ minHeight: "100vh" }}
        >
          <Typography variant="h5">New Game</Typography>
          <div className={classes.center}>
            <form className={classes.form} onSubmit={this.onSubmit}>
              <TextField
                size="small"
                placeholder="title"
                variant="outlined"
                error={this.state.errorTitle}
                helperText={this.state.titleError}
                className={classes.inputSpace}
                name="title"
                value={this.state.title}
                onChange={this.handleChange}
              />
              <TextField
                size="small"
                placeholder="Released Date"
                variant="outlined"
                error={this.state.errorDate}
                helperText={this.state.dateError}
                className={classes.inputSpace}
                name="date"
                value={this.state.date}
                onChange={this.handleChange}
              />
              <TextField
                size="small"
                placeholder="Image"
                variant="outlined"
                error={this.state.errorImage}
                helperText={this.state.imageError}
                className={classes.inputSpace}
                name="image"
                value={this.state.image}
                onChange={this.handleChange}
              />
              <TextField
                rows={4}
                multiline
                placeholder="Summary"
                variant="outlined"
                error={this.state.errorBody}
                helperText={this.state.bodyError}
                className={classes.inputSpace}
                name="body"
                value={this.state.body}
                onChange={this.handleChange}
              />
              <Button color="primary" variant="outlined" type="submit">
                Submit
              </Button>
            </form>
          </div>
          <Link to="/">
            <Button variant="outlined" className={classes.red}>
              Cancel
            </Button>
          </Link>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(GameCardCreate);
