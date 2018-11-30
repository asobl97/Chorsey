import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import api from "../api.js";


const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    width: 400,
    marginTop: theme.spacing.unit * 20,
    padding: theme.spacing.unit * 3,
    margin: "auto",
    borderRadius: 5,
    boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .1)"
  },
  header: {
    flexGrow: 1,
    marginLeft: theme.spacing.unit,
    //marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  textField: {
    marginTop: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
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
    //padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
  },
  buttonLoading: {
    backgroundColor: "white",
    "&$selected, &$selected:hover": {
      backgroundColor: "white"
    }
  }
});

class LogInForm extends React.Component {

  state = {
    email: "",
    password: "",
    loading: false,
    success: false
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleLogInSubmit = () => {
    console.log("in it");
    if (!this.state.loading) {
      // if all of the fields are filled in correctly
      // do this
      this.setState(
        {
          success: false,
          loading: true
        },
        () => {
          // replace this with axios call
          // on success, would bubble up current user to app.js
          const email = this.state.email;
          const password = this.state.password;
          /*
          var currentUser = {
            userId: "bstark",
            name: name,
            email: email,
            password: password,
            house: {
              houseId: "jaimeSucks",
              name: "House Stark",
              members: [
                {
                  userId: "bstark",
                  name: "Brandon Stark"
                },
                {
                  userId: "963480",
                  name: "Arya Stark"
                },
                {
                  userId: "307402",
                  name: "Jon Snow"
                },
                {
                  userId: "3382902",
                  name: "Sansa Stark"
                }
              ]
            }
          };
          */

          const setCurrentUser = this.props.setCurrentUser;

          api.put(`/auth/login`, {
            email: email,
            password: password
          })
          .then(function (response) {
            console.log('login user response');
            console.log(response);

            const userId = response.data.uid;
            // get user
            api.get(`/users/${userId}`)
            .then(function (userResponse) {
              console.log('get user after login w firebase response');
              console.log(userResponse);   
              
              var currentUser = userResponse.data.result;
              
              // if house id, get house
              if(currentUser.houseId == false){
                // be done with it
                setCurrentUser(currentUser);
              }else{
                // grab the house
                api.get(`/houses/${currentUser.houseId}`)
                .then(function (houseResponse) {
                  console.log('get house after login response');
                  console.log(houseResponse);   
                  
                  var house = houseResponse.data.result;
                  const houseId = house.houseId;
                  // get the members of the house
                  api.get(`/users?houseId=${houseId}`)
                  .then(function (membersResponse) {
                    console.log('get house members response');
                    console.log(membersResponse);   
                    house.members = membersResponse.data.result;    
                    currentUser.house = house;
                  
                    setCurrentUser(currentUser);
                  })
                  .catch(function (houseError) {
                    console.log(houseError);
                  });
                })
                .catch(function (userError) {
                  console.log(userError);
                });
              }
            })
            .catch(function (userError) {
              console.log(userError);
            });
          })
          .catch(function (error) {
            console.log(error);
          });
        }
      );
    }
  };

  render() {
    const { classes } = this.props;

    const loading = this.state.loading;

    var buttonClassName;
    var buttonText;

    if (!loading) {
      buttonClassName = classes.button;
      buttonText = "Log In";
    } else {
      buttonClassName = classes.buttonLoading;
      buttonText = "Logging in...";
    }

    console.log(buttonClassName);

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <Typography variant="h6" color="inherit" className={classes.header}>
          Log In
        </Typography>
        <TextField
          id="outlined-email-input"
          label="Email"
          className={classes.textField}
          type="email"
          name="email"
          value={this.state.email}
          onChange={this.handleChange("email")}
          autoComplete="email"
          margin="normal"
          variant="outlined"
          disabled={loading}
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          className={classes.textField}
          type="password"
          name="password"
          disabled={loading}
          value={this.state.password}
          onChange={this.handleChange("password")}
          autoComplete="current-password"
          margin="normal"
          variant="outlined"
        />
        <Button
          className={buttonClassName}
          disabled={loading}
          onClick={this.handleLogInSubmit}
        >
          {buttonText}
        </Button>
      </form>
    );
  }
}

LogInForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LogInForm);
