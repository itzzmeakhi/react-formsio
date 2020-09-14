import React from 'react'

import { useFormsio } from 'react-formsio';
import 'react-formsio/dist/index.css';

import './App.css';

const App = () => {
    // const INITIAL_STATE = {
    //     userName: '',
    //     userEmail: ''
    // };
    const [ register, formState, validationRules ] = useFormsio();
    //console.log('Component');
    console.log(formState);
    console.log(validationRules);

    return(
        <form>
            {/* validators: 'required|minLength:6:8|required:false|xxx:0|minLength:e|minLength:9|maxLength:8' */}
            <input
                type = 'text'
                placeholder = 'Enter your name'
                name = 'userName'
                ref = { register({ 
                                    name: 'userName', 
                                    validators: 'required|maxLength:6', 
                                    regexValidators: { pattern: /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/, validMobile: /^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/, zenz: 'mm'  } 
                                }) }
                autoComplete = 'off' />

            <input
                type = 'email'
                placeholder = 'Enter your email'
                name = 'userEmail'
                ref = { register({  
                                    name: 'userEmail', 
                                    validators: 'required|email' 
                                }) }
                autoComplete = 'off' />

            <input
                type = 'text'
                placeholder = 'Tell us your DOB'
                name = 'userDOB'
                ref = { register({
                                    name: 'userDOB',
                                    validators: 'required',
                                    regexValidators: { validBirthDate: true }
                                }) }
                autoComplete = 'off' />

            <input
                type = 'password'
                placeholder = 'Please provide a password'
                name = 'userPassword'
                ref = { register({
                                    name: 'userPassword',
                                    validators: 'required',
                                    regexValidators: { passwordStrength: true }
                                }) }
                autoComplete = 'off' />

            <button
                type = 'submit'>
                    Submit
            </button>

        </form>
    )
}

export default React.memo(App);
