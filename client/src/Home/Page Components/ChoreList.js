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
import Tooltip from '@material-ui/core/Tooltip';
import api from "../../api.js";


const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  avatar: {
    color: "#000",
    backgroundColor: "#fff"
  },
  inline: {
    display: "inline",
    flex: "flex-end"
  },
  addChoreForm: {
    position: "absolute"
  }
});

function formatDateForServer(date) {

  var day = date.getDate();
  var month = date.getMonth();
  var year = date.getFullYear(); 

  return `${year}-${month}-${day}`;
}

function formatDateToDisplay(date) {
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

    //fetch chores
    api.get(`/chores?houseId=${houseId}&completed=FALSE`)
    .then(function (choresResponse) {
      var chores = choresResponse.data.result.map(chore =>{  
        chore.assignedTo = choresResponse.data.relatables[chore.userId]; // we want full user object, not just user id
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

  handleMarkChoreCompleted = completedChoreId => () => { 
    const { checked } = this.state;
    const currentIndex = checked.indexOf(completedChoreId);
    const newChecked = [...checked];

    if (currentIndex === -1) {

      newChecked.push(completedChoreId);

      const chores = this.props.chores;

     const chore = chores.find((chore) => chore.choreId === completedChoreId)

      api.put(`/chores/${completedChoreId}`, {
        userId: chore.userId, 
        houseId: chore.houseId,
        name: chore.name,
        description: chore.description,
        dueDate: formatDateForServer(chore.dueDate),
        completed: true
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

    if (chores != false) {
      //chores exist
 
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
            {chores.map(chore => (
              <ListItem
                key={chore.choreId}
                alignItems="flex-start"
                button
                divider
                disabled={this.state.checked.indexOf(chore.choreId) !== -1}
              >
                <Avatar className={classes.avatar} disabled={
                        this.state.checked.indexOf(chore.choreId) !== -1
                      }
                >
                  {chore.assignedTo.name.split(" ", 2)[0].charAt(0) + chore.assignedTo.name.split(" ", 2)[1].charAt(0).toUpperCase()}
                </Avatar>

                <ListItemText
                  primary={`${chore.name}`}
                  secondary={`Assigned to: ${
                    chore.assignedTo.name
                  }, due ${formatDateToDisplay(chore.dueDate)}`}
                  disabled={
                    this.state.checked.indexOf(chore.choreId) !== -1
                  }
                />
                {chore.assignedTo.userId === this.props.currentUserID && this.state.checked.indexOf(chore.choreId) === -1 && (
                  <Tooltip title="Mark Completed" placement="left">
                    <ListItemSecondaryAction>
                    <Checkbox
                      onChange={this.handleMarkChoreCompleted(chore.choreId)}
                      checked={this.state.checked.indexOf(chore.choreId) !== -1}
                      disabled={
                        this.state.checked.indexOf(chore.choreId) !== -1
                      }
                    />
                    </ListItemSecondaryAction>
                  </Tooltip>
                )}
                {chore.assignedTo.userId === this.props.currentUserID && this.state.checked.indexOf(chore.choreId) !== -1 &&  (
                  <Tooltip title="Well Done!" placement="left">
                  <ListItemSecondaryAction>
                  <Checkbox
                    onChange={this.handleToggle(chore.choreId)}
                    checked={this.state.checked.indexOf(chore.choreId) !== -1}
                    disabled={
                      this.state.checked.indexOf(chore.choreId) !== -1
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
