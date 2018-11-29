import React from "react";
import LandingAppBar from "./LandingAppBar.js";
import SignUpForm from "./SignUpForm.js";
import LogInForm from "./LogInForm.js";

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormToggle = this.handleFormToggle.bind(this);
  }

  state = {
    newUser: true,
    user: {}
  };

  handleFormToggle() {
    this.setState({
      newUser: !this.state.newUser
    });
  }

  render() {
    const newUser = this.state.newUser;

    var formToShow;

    if (newUser) {
      formToShow = <SignUpForm setCurrentUser={this.props.setCurrentUser} />;
    } else {
      formToShow = <LogInForm setCurrentUser={this.props.setCurrentUser} />;
    }

    return (
      <div className="root">
        <LandingAppBar
          handleFormToggle={this.handleFormToggle}
          newUser={this.state.newUser}
        />
        {formToShow}
      </div>
    );
  }
}

export default LandingPage;
