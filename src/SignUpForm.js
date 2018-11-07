import React from 'react';

class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: '',  email: '', password: '' };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

	render() {
		return (
            <div>
               <h3>Sign Up</h3>
			    <form className="signUpForm" onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="name">
                            Name
                        </label>
                        <input type="text" id="signUpNameTextBox" name="name" placeholder="Name" onChange={this.handleInputChange}
                        value={this.state.name} />
                    </div>
                    <div>
                        <label htmlFor="email">
                            Email
                        </label>
                        <input type="text" id="signUpEmailTextBox" name="email" placeholder="Email" onChange={this.handleInputChange}
                        value={this.state.email} />
                    </div>
                    <div>
                        <label htmlFor="password">
                            Password
                        </label>
                        <input type="text" id="signUpPasswordTextBox" name="password" placeholder="Password" onChange={this.handleInputChange}
                        value={this.state.password} />
                    </div>
                    <input type="submit" value="Sign Up" />
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

        // send ajax request to sign up
    }
}

export default SignUpForm;