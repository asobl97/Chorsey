import React from 'react';
import './stylesheets/logInForm.css';

class LogInForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '' };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

	render() {
		return (
            <form className="logInForm" onSubmit={this.handleSubmit}>
                <input type="submit" className="submit1" value="login" />
                <div id="form2">Password<br />
                    <input placeholder="Password" type="password" name="password" 
                        onChange={this.handleInputChange} value={this.state.password} /><br />
                    <a href='#'>Forgotten your password?</a>
                </div>
                <div id="form1">Email<br />
                    <input placeholder="Email" type="mail" name="email" 
                        onChange={this.handleInputChange} value={this.state.email} /><br />
                    <input type="checkbox" /> keep me logged in
                </div> 
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

        // send ajax request to log in
    }
}

export default LogInForm;