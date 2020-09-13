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

            <input
                type = 'text'
                placeholder = 'Enter your name'
                name = 'userName'
                ref = { register({ 
                                    name: 'userName', 
                                    validators: 'required|minLength:6:8|required:false|xxx:0|minLength:e|minLength:9|minLength:8', 
                                    regexValidators: { pattern: /^[789]\d{9}$/, validMobile: /^[a-z]/, zenz: 'mm'  } 
                                }) }
                autoComplete = 'off' />

            <input
                type = 'email'
                placeholder = 'Enter your email'
                name = 'userEmail'
                ref = { register({  
                                    name: 'userEmail', 
                                    validators: 'email' 
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
