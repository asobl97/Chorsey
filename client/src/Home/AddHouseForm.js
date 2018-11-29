import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SvgIcon from "@material-ui/core/SvgIcon";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import api from "../api.js";

const styles = theme => ({
  formContainer: {
    backgroundColor: "white",
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
  icon: {
    margin: theme.spacing.unit * 2
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
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
  },
  buttonLoading: {
    backgroundColor: "white",
    "&$selected, &$selected:hover": {
      backgroundColor: "white"
    }
  }
});

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

class AddHouseForm extends React.Component {
  state = {
    houseJoinType: "newHouse", //create new or join existing house
    houseId: "",
    houseName: "",
    loading: false,
    success: false
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleAddHouseSubmit = event => {
    if (!this.state.loading) {
      this.setState(
        {
          success: false,
          loading: true
        },
        () => {

          const houseJoinType = this.state.houseJoinType;
          const acurrentUser = this.props.currentUser;
          const completedAddHouse = this.props.completedAddHouse;

          if (houseJoinType === "newHouse") {
            const houseName = this.state.houseName;
            const existing = false;

            api.post('/houses', {
              name: houseName
            })
            .then(function (createHouseResponse) {
              console.log('create house response');
              console.log(createHouseResponse);
              api.put(`/users/${acurrentUser.userId}/house/${createHouseResponse.data.result.houseId}`, {
                // everything is in path
              })
              .then(function (response) {
                console.log('put user house response');
                console.log(response);
                var house = createHouseResponse.data.result;
                house.members = [{
                  userId: acurrentUser.userId,
                  name: acurrentUser.name
                }];
                completedAddHouse(house, existing);
              })
              .catch(function (error) {
                console.log(error);
              });
            })
            .catch(function (error) {
              console.log(error);
            });
          } else {

            const houseId = this.state.houseId;
            const existing = true;
            console.log('house id');
              console.log(houseId);

            api.put(`/users/${acurrentUser.userId}/house/${houseId}`, {
              // everything is in path
            })
            .then(function (response) {
              console.log('put user house response');
              console.log(response);

              var house = {
                houseId: houseId
              };

              // get house name
              api.get(`/houses/${houseId}`)
              .then(function (houseResponse) {
                console.log('get existing house response');
                console.log(houseResponse);
                house.name = houseResponse.data.result.name;
                // get house members
                api.get(`/users?houseId=${houseId}`)
                .then(function (membersResponse) {
                  console.log('get house members response');
                  console.log(membersResponse);   
                  house.members = membersResponse.data.result;    
                  completedAddHouse(house, existing);           
                })
                .catch(function (houseError) {
                  console.log(houseError);
                });
              })
              .catch(function (houseError) {
                console.log(houseError);
              });
            })
            .catch(function (error) {
              console.log(error);
            });
          }
        }
      );
    }
  };

  render() {
    const { classes } = this.props;

    const houseJoinType = this.state.houseJoinType;

    const loading = this.state.loading;

    var buttonClassName;
    var buttonText;

    if (!loading) {
      buttonClassName = classes.button;
      buttonText = "Finish";
    } else {
      buttonClassName = classes.buttonLoading;
      if (houseJoinType === "newHouse") {
        buttonText = "Creating house...";
      } else {
        buttonText = "Joining house...";
      }
    }

    let inputTextfield;

    if (houseJoinType === "newHouse") {
      inputTextfield = (
        <TextField
          id="outlined-houseName-input"
          label="House Name"
          className={classes.textField}
          type="houseName"
          name="houseName"
          value={this.state.houseName}
          onChange={this.handleChange("houseName")}
          margin="normal"
          variant="outlined"
        />
      );
    } else {
      inputTextfield = (
        <TextField
          id="outlined-houseId-input"
          label="House ID"
          className={classes.textField}
          type="houseId"
          name="houseId"
          value={this.state.houseId}
          onChange={this.handleChange("houseId")}
          margin="normal"
          variant="outlined"
        />
      );
    }

    return (
      <form className={classes.formContainer} noValidate autoComplete="off">
        <HomeIcon className={classes.icon} color="primary" fontSize="large" />
        <Typography variant="h6" color="inherit" className={classes.header}>
          Join a house!
        </Typography>
        <FormControl component="fieldset" className={classes.formControl}>
          <RadioGroup
            aria-label="House Join Type"
            name="houseJoinType"
            className={classes.group}
            value={this.state.houseJoinType}
            onChange={this.handleChange("houseJoinType")}
          >
            <FormControlLabel
              value="newHouse"
              name="houseJoinType"
              control={<Radio />}
              label="Create House"
            />
            <FormControlLabel
              value="existingHouse"
              name="houseJoinType"
              control={<Radio />}
              label="Existing House"
            />
          </RadioGroup>
        </FormControl>
        {inputTextfield}
        <Button
          className={buttonClassName}
          disabled={loading}
          onClick={this.handleAddHouseSubmit}
        >
          {buttonText}
        </Button>
      </form>
    );
  }
}

AddHouseForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddHouseForm);
