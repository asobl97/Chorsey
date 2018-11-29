import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import AddChoreForm from "./AddChoreForm.js";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Icon from "@material-ui/core/Icon";
import Avatar from "@material-ui/core/Avatar";

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  avatar: {
    color: "#fff",
    backgroundColor: theme.palette.primary.main
  },
  inline: {
    display: "inline",
    flex: "flex-end"
  },
  addChoreForm: {
    position: "absolute"
  }
});

function formatDate(date) {
  var monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return monthNames[monthIndex] + " " + day + ", " + year;
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

class ChoreList extends React.Component {
  state = {
    checked: [],
    addChoreFormOpened: false
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
      this.setState({
        checked: newChecked
      });
      // push up chore marked as complete
      // send request to mark chore as complete
      // update state in home page
    } else {
      // this should never happen, for now
      // newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  };

  showAddChoreForm = () => {
    this.setState({ addChoreFormOpened: true });
  };

  closeAddChoreForm = () => {
    this.setState({ addChoreFormOpened: false });
  };

  render() {
    const { classes } = this.props;

    const chores = this.props.chores;
    console.log(chores);

    if (chores != false) {
      //they exist
      /*
                  <Typography
                    component="span"
                    className={classes.inline}
                    color="textSecondary"
                  >
                    {`Due Date: ${formatDate(value.dueDate)}`}
                  </Typography>
                  */
      return (
        <div className={classes.root}>
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.addChoreFormOpened}
            onClose={this.closeAddChoreForm}
          >
            <div style={getModalStyle()} className={classes.addChoreForm}>
              <AddChoreForm
                houseMembers={this.props.houseMembers}
                houseId={this.props.houseId}
                completedAddChore={this.props.completedAddChore}
                closeAddChoreForm={this.closeAddChoreForm}
              />
            </div>
          </Modal>
          <List dense>
            <ListItem button divider onClick={event => this.showAddChoreForm()}>
              <Icon
                className={classes.icon}
                color="primary"
                style={{ fontSize: 44 }}
              >
                add_circle
              </Icon>
              <ListItemText primary={`Add Chore`} />
            </ListItem>
            {chores.map(value => (
              <ListItem
                key={value.choreId}
                alignItems="flex-start"
                button
                divider
                disabled={this.state.checked.indexOf(value.choreId) !== -1}
              >
                <Avatar className={classes.avatar}>
                  {value.assignedTo.name.charAt(0)}
                </Avatar>

                <ListItemText
                  primary={`${value.title}`}
                  secondary={`Assigned to: ${
                    value.assignedTo.name
                  }, due ${formatDate(value.dueDate)}`}
                />
                {value.assignedTo.userId === this.props.currentUserID && (
                  <ListItemSecondaryAction>
                    <Checkbox
                      onChange={this.handleToggle(value.choreId)}
                      checked={this.state.checked.indexOf(value.choreId) !== -1}
                      disabled={
                        this.state.checked.indexOf(value.choreId) !== -1
                      }
                    />
                  </ListItemSecondaryAction>
                )}
              </ListItem>
            ))}
          </List>
        </div>
      );
    } else {
      //no chores
      return (
        <div className={classes.root}>
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.addChoreFormOpened}
            onClose={this.closeAddChoreForm}
          >
            <div style={getModalStyle()} className={classes.addChoreForm}>
              <AddChoreForm
                houseId={this.props.houseId}
                houseMembers={this.props.houseMembers}
                completedAddChore={this.props.completedAddChore}
                closeAddChoreForm={this.closeAddChoreForm}
              />
            </div>
          </Modal>
          <List dense>
            <ListItem button divider onClick={event => this.showAddChoreForm()}>
              <Icon
                className={classes.icon}
                color="primary"
                style={{ fontSize: 44 }}
              >
                add_circle
              </Icon>
              <ListItemText primary={`Add Chore`} />
            </ListItem>
          </List>
        </div>
      );
    }
  }
}

ChoreList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ChoreList);
