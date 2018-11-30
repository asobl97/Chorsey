import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import Icon from "@material-ui/core/Icon";

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: 20
  },
  chip: {
    margin: theme.spacing.unit,
  },
});

function handleClick() {
  alert('You clicked the Chip.'); // eslint-disable-line no-alert
}

function HouseMemberChips(props) {
  const { classes } = props;
  const houseMembers = props.houseMembers
  return (
    <div className={classes.root}>
      {houseMembers.map(member => (
        <Chip
        icon={<FaceIcon />}
        label={member.name}
        className={classes.chip}
        //color="primary"
        variant="outlined"
      />
      ))}
      <Chip
        icon={ <Icon
          //className={classes.icon}
          //color="primary"
          //style={{ fontSize: 44 }}
        >
          add_circle
        </Icon>}
        clickable
        onClick={handleClick}
        label="Invite Housemate"
        className={classes.chip}
        color="primary"
        variant="outlined"
      />
    </div>
  );
}

HouseMemberChips.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HouseMemberChips);
