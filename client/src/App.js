import React from 'react';
import Header from './Header.js';
import Sidebar from './Sidebar.js';
import ChoreList from './ChoreList.js';
import SignUpForm from './SignUpForm.js';

class App extends React.Component {
	render() {
		return (
			<div id="app">
				<Header />
				<SignUpForm />
			</div>
		);
	}
}

export default App;