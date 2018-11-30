import React, { useEffect } from "react";
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
import Tooltip from '@material-ui/core/Tooltip';
import api from "../api.js";


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

function serverFormatDate(date) {

  var day = date.getDate();
  var month = date.getMonth();
  var year = date.getFullYear(); 

  return `${year}-${month}-${day}`;
}

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

  componentDidMount() {

    const houseId = this.props.houseId;
    const setChores = this.props.setChores;

    //fetch those chores boi!!!!
    api.get(`/chores?houseId=${houseId}&completed=FALSE`)
    .then(function (choresResponse) {
      console.log('get uncompleted house chores response');
      console.log(choresResponse);   
      var chores = choresResponse.data.result.map(chore =>{  
        chore.assignedTo = choresResponse.data.relatables[chore.userId];
        chore.dueDate = new Date(chore.dueDate);
        return chore;
     });
      setChores(chores);
    })
    .catch(function (choresError) {
      console.log('get uncompleted house chores error');
      console.log(choresError);
    });
  }

  handleToggle = value => () => { // basically handle mark as completed
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
      // push up chore marked as complete
      // send request to mark chore as complete
      const chores = this.props.chores;
      /*
      var chore;
      for(chore in chores){
        console.log(`looping chore: ${chore}`)
        if(chore.choreId === value){
          break;
        }
      }
      */
     const chore = chores.find((chore) => chore.choreId === value)
      console.log(`marked value: ${value}`)
      console.log(`marked chore matching value: ${chore}`)
      console.log('about to mark as complete...');
      console.log(`due date: ${chore.dueDate}`)
      console.log(`due date type: ${typeof chore.dueDate}`)
      console.log(chore);

      api.put(`/chores/${value}`, {
        userId: chore.userId, // should be the current user's user id
        houseId: chore.houseId,
        name: chore.name,
        description: chore.description,
        dueDate: serverFormatDate(chore.dueDate),
        completed: true
      })
      .then(function (response) {
        console.log('mark chore as completed response');
        console.log(response);
      })
      .catch(function (error) {
        console.log('mark chore as completed error');
        console.log(error);
      });      
      this.setState({
        checked: newChecked
      });
    }
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
                <Avatar className={classes.avatar} disabled={
                        this.state.checked.indexOf(value.choreId) !== -1
                      }
                >
                  {value.assignedTo.name.charAt(0)}
                </Avatar>

                <ListItemText
                  primary={`${value.name}`}
                  secondary={`Assigned to: ${
                    value.assignedTo.name
                  }, due ${formatDate(value.dueDate)}`}
                  disabled={
                    this.state.checked.indexOf(value.choreId) !== -1
                  }
                />
                {value.assignedTo.userId === this.props.currentUserID && this.state.checked.indexOf(value.choreId) === -1 && (
                  <Tooltip title="Mark Completed" placement="left">
                    <ListItemSecondaryAction>
                    <Checkbox
                      onChange={this.handleToggle(value.choreId)}
                      checked={this.state.checked.indexOf(value.choreId) !== -1}
                      disabled={
                        this.state.checked.indexOf(value.choreId) !== -1
                      }
                    />
                    </ListItemSecondaryAction>
                  </Tooltip>
                )}
                {value.assignedTo.userId === this.props.currentUserID && this.state.checked.indexOf(value.choreId) !== -1 &&  (
                  <Tooltip title="Well Done!" placement="left">
                  <ListItemSecondaryAction>
                  <Checkbox
                    onChange={this.handleToggle(value.choreId)}
                    checked={this.state.checked.indexOf(value.choreId) !== -1}
                    disabled={
                      this.state.checked.indexOf(value.choreId) !== -1
                    }
                  />
                  </ListItemSecondaryAction>
                  </Tooltip>
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
