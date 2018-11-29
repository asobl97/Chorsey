import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import HomeAppBar from "./HomeAppBar.js";
import ChoreList from "./ChoreList.js";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import AddHouseForm from "./AddHouseForm.js";
import axios from "axios";

Object.prototype.hasOwnProperty = function(property) {
  return this[property] !== undefined;
};

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const styles = theme => ({
  homePage: {
    padding: theme.spacing.unit * 4
  },
  homeContent: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    marginTop: "10%",
    height: "100%"
  },
  headerLabel: {
    padding: theme.spacing.unit * 4
  },
  addHouseForm: {
    position: "absolute"
  },
  button: {
    marginTop: theme.spacing.unit * 2,
    margin: "auto",
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 50,
    width: 125,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
  }
});

class HomePage extends React.Component {
  //content is toggled based on whether the current user has a house or not
  state = {
    houseId: "",
    addHouseFormOpened: false,
    chores: []
  };

  componentWillMount() {
    if (this.props.currentUser.hasOwnProperty("house")) {
      if (this.props.currentUser.house.hasOwnProperty("houseId")) {
        this.setState({
          houseId: this.props.currentUser.house.houseId
        });
      }
    }
  }

  componentDidMount() {
    if (this.props.currentUser.hasOwnProperty("house")) {
      if (this.props.currentUser.house.hasOwnProperty("houseId")) {
        // TODO
        // fetch those motherfucking chores
        // update state
        // special bypass
        if (this.props.currentUser.userId === "bstark") {
          const chores = [
            {
              choreId: "1192830",
              title: "Watch Over The Troublemakers",
              assignedTo: {
                userId: "bstark",
                name: "Brandon Stark"
              },
              dueDate: new Date("11/28/2018")
            },
            {
              choreId: "9293846",
              title: "Clean His Living Quarters",
              assignedTo: {
                userId: "307402",
                name: "Jon Snow"
              },
              dueDate: new Date("11/30/2018")
            },
            {
              choreId: "90280",
              title: "Clean The Faces",
              assignedTo: {
                userId: "963480",
                name: "Arya Stark"
              },
              dueDate: new Date("12/03/2018")
            }
          ];
          this.setState({
            chores: chores
          });
        }
      }
    }
  }

  setCurrentUser(user) {
    this.props.setCurrentUser(user);
  }

  clearCurrentUser() {
    this.props.clearCurrentUser();
  }

  showAddHouseForm = () => {
    this.setState({ addHouseFormOpened: true });
  };

  closeAddHouseForm = () => {
    this.setState({ addHouseFormOpened: false });
  };

  completedAddHouse = (house, existing) => {
    this.closeAddHouseForm();
    // TODO
    // add house to current user object
    // send user up to setCurrentUser(user)
    // shit should then propogate back down
    if (existing) {
      console.log("not where we want");
    } else {
      console.log("where we want");
      var currentUser = this.props.currentUser;
      currentUser.house = house;
      this.props.setCurrentUser(currentUser);
      this.setState({
        houseId: this.props.currentUser.house.houseId
      });
    }
  };

  completedAddChore = chore => {
    // no need to close form, already done for us by chore list

    var chores = this.state.chores;

    // checking if empty
    if (chores == false) {
      chores = [chore];
    } else {
      chores.push(chore);
    }

    this.setState({ chores: chores });
  };

  render() {
    const { classes } = this.props;

    if (this.state.houseId === "") {
      // we say join a house
      return (
        <div id="HomePage" className={classes.homePage}>
          <HomeAppBar clearCurrentUser={this.props.clearCurrentUser} />
          <div id="HomeContent" className={classes.homeContent}>
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={this.state.addHouseFormOpened}
              onClose={this.closeAddHouseForm}
            >
              <div style={getModalStyle()} className={classes.addHouseForm}>
                <AddHouseForm
                  currentUser={this.props.currentUser}
                  completedAddHouse={this.completedAddHouse}
                />
              </div>
            </Modal>
            <Typography
              align="center"
              variant="h3"
              color="black"
              className={classes.headerLabel}
            >
              Join a house!
            </Typography>
            <Button
              className={classes.button}
              onClick={event => this.showAddHouseForm()}
            >
              Get Started
            </Button>
          </div>
        </div>
      );
    } else {
      // we show chores list
      const chores = this.state.chores;

      // grabbing house members in safe way, checking if they exist
      // WARNING possible fuck up here, maybe not safe????
      var houseMembers = this.props.currentUser.house.members;

      return (
        <div id="HomePage" className={classes.homePage} hasHouse={true}>
          <HomeAppBar clearCurrentUser={this.props.clearCurrentUser} />
          <div id="HomeContent" className={classes.homeContent}>
            <Typography
              align="center"
              variant="h3"
              color="black"
              className={classes.headerLabel}
            >
              {this.props.currentUser.house.name}
            </Typography>
            <ChoreList
              chores={chores}
              currentUserID={this.props.currentUser.userId}
              houseMembers={houseMembers}
              completedAddChore={this.completedAddChore}
            />
          </div>
        </div>
      );
    }
  }
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HomePage);
