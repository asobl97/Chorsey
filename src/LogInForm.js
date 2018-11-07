import React from 'react';

class LogInForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '' };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

	render() {
		return (
            <div>
               <h3>Log In</h3>
			    <form className="logInForm" onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="email">
                            Email
                        </label>
                        <input type="text" id="logInEmailTextBox" name="email" placeholder="Email" onChange={this.handleInputChange}
                        value={this.state.email} />
                    </div>
                    <div>
                        <label htmlFor="password">
                            Password
                        </label>
                        <input type="text" id="logInPasswordTextBox" name="password" placeholder="Password" onChange={this.handleInputChange}
                        value={this.state.password} />
                    </div>
                    <input type="submit" value="Log In" />
  			    </form> 
            </div>
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