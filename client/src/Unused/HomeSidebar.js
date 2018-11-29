import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import SidebarListItem from "./SidebarListItem.js";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

const styles = theme => ({
  sidebar: {
    flex: "30%",
    //backgroundColor: "#ECEFF1",
    height: "100%"
  }
});

class SelectedListItem extends React.Component {
  state = {
    selectedIndex: 1
  };

  handleListItemClick = (event, index) => {
    this.setState({ selectedIndex: index });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.sidebar}>
        <List component="nav">
          <SidebarListItem
            button
            selected={this.state.selectedIndex === 0}
            onClick={event => this.handleListItemClick(event, 0)}
          >
            <ListItemText primary="House" />
          </SidebarListItem>
          <SidebarListItem
            button
            selected={this.state.selectedIndex === 1}
            onClick={event => this.handleListItemClick(event, 1)}
          >
            <Divider />
            <ListItemText primary="Chores" />
            <Divider />
          </SidebarListItem>
          <SidebarListItem
            button
            selected={this.state.selectedIndex === 2}
            onClick={event => this.handleListItemClick(event, 2)}
          >
            <Divider />
            <ListItemText primary="Members" />
            <Divider />
          </SidebarListItem>
        </List>
        <List component="nav">
          <SidebarListItem
            button
            selected={this.state.selectedIndex === 2}
            onClick={event => this.handleListItemClick(event, 2)}
          >
            <ListItemText primary="My Profile" />
          </SidebarListItem>
          <SidebarListItem
            button
            selected={this.state.selectedIndex === 3}
            onClick={event => this.handleListItemClick(event, 3)}
          >
            <Divider />
            <ListItemText primary="Settings" />
            <Divider />
          </SidebarListItem>
        </List>
      </div>
    );
  }
}

SelectedListItem.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SelectedListItem);
