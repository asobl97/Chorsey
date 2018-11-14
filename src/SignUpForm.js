import React from 'react';
import './stylesheets/signUpForm.css';

class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: '',  email: '', password: '' };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

	render() {
		return (
		    <form className="signUpForm" onSubmit={this.handleSubmit}>
                <div className="tagline1">Sign up</div>
                <input type="text" id="signUpNameBox" name="name" placeholder="Name" onChange={this.handleInputChange} value={this.state.name} />
                <br />
                <input type="text" id="signUpEmailBox" name="email" placeholder="Email" onChange={this.handleInputChange} value={this.state.email} />
                <br />
                <input type="text" id="signUpEmailBox" name="email" placeholder="Verify Email" />
                <br />
                <input type="text" id="signUpPasswordBox" name="password" placeholder="Password" onChange={this.handleInputChange} value={this.state.password} />
                <br />
                <input type="submit" className="btn1" value="Sign Up" />
			 </form> 
		);
    }
    
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
          });
    }
    
    handleSubmit(event) {
        //event.preventDefault(); // not sure what this does, but its in react tutorial
        
        // check inputs are all good

        // send ajax request to sign up
    }
}

export default SignUpForm;