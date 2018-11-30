import React from "react";
import cookies from "react-cookies";
import LandingPage from "./Landing/LandingPage.js";
import HomePage from "./Home/HomePage.js";


class App extends React.Component {

  constructor(props) {
    super(props);
    this.setCurrentUser = this.setCurrentUser.bind(this);
    this.clearCurrentUser = this.clearCurrentUser.bind(this);
  }

  state = {
    currentUser: null
  };

  componentWillMount() {
    if(cookies.load('currentUser') !== undefined) {
      this.setState({
        currentUser: cookies.load('currentUser')
      });
    }
  }

  setCurrentUser = currentUser => {
    console.log("we in it");
    console.log(currentUser);
    this.setState({
      currentUser: currentUser
    });
    cookies.save('currentUser', currentUser, { path: '/' })
  };

  clearCurrentUser = () => {
    this.setState({
      currentUser: null
    });
    cookies.save('currentUser', currentUser, { path: '/' })
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
