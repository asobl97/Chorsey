import React from "react";
import cookies from "react-cookies";
import LandingPage from "./Landing/LandingPage.js";
import HomePage from "./Home/HomePage.js";

// lets make some fake data!!!

const fakeCurrentUser = {
  userId: "90092",
  name: "Sam Mitchell",
  email: "smitchell@scu.edu",
  password: "Wintheday1!",
  house: {
    houseId: "544",
    name: "Formerly Brown",
    members: [
      {
        userId: "90092",
        name: "Sam Mitchell"
      },
      {
        userId: "963480",
        name: "Jesse"
      },
      {
        userId: "307402",
        name: "Michael"
      }
    ],
    chores: [
      {
        choreID: "90280",
        name: "Do the Dishes",
        assignedTo: "Sam",
        dueDate: "11-28-2018"
      },
      {
        choreID: "1192830",
        name: "Take Out the Trash",
        assignedTo: "Michael",
        dueDate: "11-28-2018"
      },
      {
        choreID: "9293846",
        name: "Clean the Living Room",
        assignedTo: "Jesse",
        dueDate: "11-30-2018"
      },
      {
        choreID: "787846",
        name: "Clean the Bathroom",
        assignedTo: "Jesse",
        dueDate: "12-03-2018"
      }
    ]
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.setCurrentUser = this.setCurrentUser.bind(this);
    this.clearCurrentUser = this.clearCurrentUser.bind(this);
  }

  state = {
    currentUser: null
  };

  setCurrentUser = currentUser => {
    console.log("we in it");
    console.log(currentUser);
    this.setState({
      currentUser: currentUser
    });
  };

  clearCurrentUser = () => {
    this.setState({
      currentUser: null
    });
  };

  render() {
    let startingPage;

    if (this.state.currentUser === null) {
      startingPage = <LandingPage setCurrentUser={this.setCurrentUser} />;
    } else {
      const currentUser = this.state.currentUser;
      startingPage = (
        <HomePage
          currentUser={currentUser}
          setCurrentUser={this.setCurrentUser}
          clearCurrentUser={this.clearCurrentUser}
        />
      );
    }
    return <div>{startingPage}</div>;
  }
}

export default App;
