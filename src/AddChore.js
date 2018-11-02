import React from 'react';

class AddChore extends React.Component {
	render() {
		return (
			<form className="addChore">
				<input type="text" id="addChoreTextBox" placeholder="Add a chore" />
				<input type="submit" value="Add" />
  			</form>
		);
	}
}

export default AddChore;