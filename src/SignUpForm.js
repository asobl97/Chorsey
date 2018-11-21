import React from 'react';
import './stylesheets/signUpForm.css';
//import { createSecureServer } from 'http2';

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
                <form className="signUpForm" onSubmit={this.handleSubmit}>
                    <div className="tagline1">Sign up</div>
                    <input type="text" id="signUpNameBox" name="name" placeholder="Name" onChange={this.handleInputChange} value={this.state.name} />
                    <br />
                    <input type="mail" id="signUpEmailBox" name="email" placeholder="Email" onChange={this.handleInputChange} value={this.state.email} />
                    <br />
                    <input type="mail" id="signUpEmailVer" name="verify email" placeholder="Verify Email" />
                    <br />
                    <input type="password" id="signUpPasswordBox" name="password" placeholder="Password" onChange={this.handleInputChange} value={this.state.password} />
                    <br />
                    <input type="submit" className="btn1" value="Sign Up" />
                 </form>
             </div>
        );
    }
    
    handleInputChange(event) {
        const inputFieldChanged = event.target;
        updateState(inputFieldChanged);
    }

    updateState(inputFieldChanged){
        this.setState({
            [inputFieldChanged.name]: inputFieldChanged.value
          });
    }

    
    handleSubmit(event) {
        if(this.formIsFilled){
            createUserAccount()
        }else{
            alertUserInvalidInput()
        }
    }

    formIsFilled() {
        const formInputs = this.state;
        Object.keys(formInputs).forEach(function(key) {
            // all inputs must have a value, all inputs strings
            if(typeof formInputs[key] == undefined || formInputs[key].length < 1){
                return false;
            }
        })
    }

    createUserAccount(){
        // send ajax request
        // need more info on request flow
    }

    alertUserInvalidInput() {
        alert("Invalid Input");
    }

}

export default SignUpForm;