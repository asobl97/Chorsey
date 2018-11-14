import React from 'react';
import './stylesheets/header.css';

class Header extends React.Component {
	render() {
		return (
			<nav className="mainNav">
				<img className="mainNav-logo" alt="Choresy Logo" src="choresy_logo_white.svg" />
			</nav>
		);
	}
}

export default Header;