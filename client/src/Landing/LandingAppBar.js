import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  }
};

class LandingAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormToggle = this.handleFormToggle.bind(this);
  }

  handleFormToggle(event) {
    this.props.handleFormToggle();
  }

  render() {
    const { classes } = this.props;

    const newUser = this.props.newUser;

    var toggleFormButton;

    if (newUser) {
      toggleFormButton = (
        <Button
          color="inherit"
          name="Log In"
          value="Log In"
          onClick={this.handleFormToggle}
        >
          Log In
        </Button>
      );
    } else {
      toggleFormButton = (
        <Button
          color="inherit"
          name="Sign Up"
          value="Sign Up"
          onClick={this.handleFormToggle}
        >
          Sign Up
        </Button>
      );
    }

    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Choresy
            </Typography>
            {toggleFormButton}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

LandingAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LandingAppBar);
