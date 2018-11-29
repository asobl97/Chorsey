import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MyProfileMenu from "./MyProfileMenu.js";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  }
};

function HomeAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Choresy
          </Typography>
          <MyProfileMenu clearCurrentUser={props.clearCurrentUser} />
        </Toolbar>
      </AppBar>
    </div>
  );
}

HomeAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HomeAppBar);
