import React from 'react';
import LogInForm from './LogInForm.js';
import './stylesheets/header.css';

class Header extends React.Component {
	render() {
		return (
			<nav className="mainNav">
				<img id="mainNav-logo" alt="Choresy Logo" src="choresy_logo_white.svg" />
				<LogInForm />
			</nav>
		);
	}
}

export default Header;