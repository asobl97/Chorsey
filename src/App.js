import React from 'react';
import ChoreList from './ChoreList.js';

class App extends React.Component {
	render() {
		return (
			<div id="app">
				<div>
				<ChoreList />
				</div>
			</div>
		);
	}
}

export default App;