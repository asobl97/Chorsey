import React from 'react';
import AddChore from './AddChore.js';
import './stylesheets/choreList.css';

function Chore(props) {
  return (
  	<li onClick={props.onClick}>
  		<input type="checkbox" />
  		<span>Placeholder Chore</span>
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
			<section className="choreSection">
				<div>
					<AddChore />
				</div>
				<div className="choreList">
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