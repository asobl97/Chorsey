import React from "react";
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import api from "../../api.js";

const styles = theme => ({
  container: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    width: 400,
    padding: theme.spacing.unit * 3,
    margin: "auto",
    borderRadius: 5,
    boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .1)"
  },
  header: {
    flexGrow: 1,
    marginLeft: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  textField: {
    marginTop: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  descriptorText: {
    marginTop: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
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

function formatDate(date) {

  var day = date.getDate();
  var month = date.getMonth();
  var year = date.getFullYear(); 

  return `${year}-${month}-${day}`;
}

class AddChoreForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });
  }

  state = {
    labelWidth: 0,
    assignedTo: {
      userId: '',
      name: ''
    },
    title: "",
    description: "",
    selectedDay: null,
    loading: false,
    success: false
  };

  handleDayClick(day, { selected }) {
    this.setState({
      selectedDay: selected ? undefined : day
    });
  }

  handleTextFieldChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSelectChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleAddChoreSubmit = event => {
    if (!this.state.loading) {
      this.setState(
        {
          success: false,
          loading: true
        },
        () => {

          const assignedTo = this.state.assignedTo;
          const title = this.state.title;
          const description = this.state.description;
          const selectedDay = this.state.selectedDay;
          console.log(this.state.selectedDay);
          console.log(typeof this.state.selectedDay);

          const houseId = this.props.houseId;
          const closeAddChoreForm = this.props.closeAddChoreForm;
          const completedAddChore = this.props.completedAddChore;

          api.post('/chores', {
            houseId: houseId,
            userId: assignedTo.userId,
            name: title,
            description: description,
            dueDate: formatDate(selectedDay),
            completed: false
          })
          .then(function (response) {
            console.log('post chores response');
            console.log(response);

            const chore = {
              choreId: response.data.result.choreId,
              houseId: houseId,
              userId: assignedTo.userId,
              assignedTo: assignedTo,
              name: title,
              description: description,
              dueDate: selectedDay
            };
            closeAddChoreForm();
            completedAddChore(chore);
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
      buttonText = "Finish";
    } else {
      buttonClassName = classes.buttonLoading;
      buttonText = "Creating chore...";
    }

    const possibleUserAssignments = this.props.houseMembers;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <Typography variant="h6" color="inherit" className={classes.header}>
          Add Chore
        </Typography>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel htmlFor="outlined-assign-simple" ref={ref => {
              this.InputLabelRef = ref;
            }}>Assign To</InputLabel>
          <Select
            value={this.state.assignedTo}
            onClick={this.handleSelectChange}
            input={
              <OutlinedInput
                labelWidth={this.state.labelWidth}
                name="assignedTo"
                id="outlined-assign-simple"
              />
            }
          >
            {possibleUserAssignments.map(value => (
              <MenuItem value={value}>{value.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          id="outlined-title"
          label="Title"
          className={classes.textField}
          value={this.state.title}
          onChange={this.handleTextFieldChange("title")}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-description-input"
          label="Description"
          className={classes.textField}
          type="description"
          name="description"
          value={this.state.description}
          onChange={this.handleTextFieldChange("description")}
          margin="normal"
          variant="outlined"
        />
        <div>
          <br />
          <p className={classes.descriptorText}>Due Date</p>
          <DayPicker
            selectedDays={this.state.selectedDay}
            onDayClick={this.handleDayClick}
            disabledDays={[
              {
                before: new Date()
              }
            ]}
          />
          <p className={classes.descriptorText}>
            {this.state.selectedDay
              ? this.state.selectedDay.toLocaleDateString()
              : "Please select a day"}
          </p>
        </div>
        <Button
          className={buttonClassName}
          disabled={loading}
          onClick={this.handleAddChoreSubmit}
        >
          {buttonText}
        </Button>
      </form>
    );
  }
}

AddChoreForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddChoreForm);
