import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const styles = theme => ({
  menu: {
    marginTop: 50,
    marginLeft: 15
  }
});

class MyProfileMenu extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    console.log(event.currentTarget.offsetHeight);
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogOut = () => {
    //this.setState({ anchorEl: null });
    // TODO
    // send this bitch up the pipeline
    this.props.clearCurrentUser();
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;

    return (
      <div>
        <Button
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          color="inherit"
          onClick={this.handleClick}
        >
          My Profile
        </Button>
        <Menu
          id="simple-menu"
          className={classes.menu}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleLogOut}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default withStyles(styles)(MyProfileMenu);
