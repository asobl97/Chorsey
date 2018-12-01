import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import HomeAppBar from "./Page Components/HomeAppBar.js";
import ChoreList from "./Page Components/ChoreList.js";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import AddHouseForm from "./Page Components/AddHouseForm.js";
import HouseMemberChips from "./Page Components/HouseMemberChips.js";

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
    padding: theme.spacing.unit * 2
  },
  homeContent: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    marginTop: "8%",
    height: "100%"
  },
  headerLabel: {
    padding: theme.spacing.unit 
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

  constructor(props) {
    super(props);
    this.setChores = this.setChores.bind(this);
  }

  state = {
    houseId: "",   //content is toggled based on whether the current user has a house or not
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

  setCurrentUser(user) {
    this.props.setCurrentUser(user);
  }

  clearCurrentUser() {
    this.props.clearCurrentUser();
  }

  setChores(chores) {
    
    chores.sort(function(a,b){
      return a.dueDate - b.dueDate;
    });

    this.setState({
      chores: chores
    });
  }

  showAddHouseForm = () => {
    this.setState({ addHouseFormOpened: true });
  };

  closeAddHouseForm = () => {
    this.setState({ addHouseFormOpened: false });
  };

  completedAddHouse = (house, existing) => {
    this.closeAddHouseForm();
    var currentUser = this.props.currentUser;
    currentUser.house = house;
    this.props.setCurrentUser(currentUser);
    this.setState({
      houseId: this.props.currentUser.house.houseId
    });
  };

  completedAddChore = chore => {
    // no need to close form, already done for us by chore list
    var chores = this.state.chores;

    if (chores == false) {
      chores = [chore];
    } else {
      chores.push(chore);
    }

    this.setChores(chores);
  };

  render() {
    const { classes } = this.props;

    if (this.state.houseId === "") {
      // current user has not joined a house yet
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
              color="textPrimary"
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
      // current user has joined a house, show chores for house
      const chores = this.state.chores;

      var houseMembers = this.props.currentUser.house.members;

      return (
        <div id="HomePage" className={classes.homePage} hasHouse={true}>
          <HomeAppBar clearCurrentUser={this.props.clearCurrentUser} />
          <div id="HomeContent" className={classes.homeContent}>
            <Typography
              align="center"
              variant="h3"
              color="textPrimary"
              className={classes.headerLabel}
            >
              {this.props.currentUser.house.name}
            </Typography>
            <HouseMemberChips houseMembers={houseMembers} houseId={this.state.houseId}/>
            <ChoreList
              chores={chores}
              currentUserID={this.props.currentUser.userId}
              houseId={this.state.houseId}
              houseMembers={houseMembers}
              setChores={this.setChores}
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
