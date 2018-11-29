import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ChoreList from "./ChoreList.js";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  homeContentBox: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    height: "100%"
    //marginTop: "10%"
  }
});

class HomeContentBox extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.homeContentBox}>
        <Typography align="center" variant="h3" color="black">
          House Name
        </Typography>
        <ChoreList />
      </div>
    );
  }
}

HomeContentBox.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HomeContentBox);
