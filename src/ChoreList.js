import React from 'react';
import AddChore from './AddChore.js';

function Chore(props) {
  return (
  	<li onClick={props.onClick}>
  		Placeholder Chore
  	</li>
  );
}

class ChoreList extends React.Component {
	renderChore() {
	    return (
	    	<Chore
	    		onClick={() => this.props.onClick(i)}
	    	/>
	    );
	}

	render() {
		return (
			<section>
				<div>
					<AddChore />
				</div>
				<div className="ChoreList">
					<ul>
						{this.renderChore()}
						{this.renderChore()}
						{this.renderChore()}
						{this.renderChore()}
						{this.renderChore()}
					</ul>
				</div>
			</section>
		);
	}
}

export default ChoreList;