import React from 'react'

import { useFormsio } from 'react-formsio';
import 'react-formsio/dist/index.css';

import './App.css';

const App = () => {
    // const INITIAL_STATE = {
    //     userName: '',
    //     userEmail: ''
    // };
    const [ register, formState ] = useFormsio();
    //console.log('Component');
    console.log(formState);

    return(
        <form>

            <input
                type = 'text'
                placeholder = 'Enter your name'
                name = 'userName'
                ref = { register({ 
                                    name: 'userName', 
                                    validations: 'required|minLength:5', 
                                    regexValidations: { pattern: /^[789]\d{9}$/ } 
                                }) }
                autoComplete = 'off' />

            <input
                type = 'email'
                placeholder = 'Enter your email'
                name = 'userEmail'
                ref = { register({  
                                    name: 'userEmail', 
                                    validations: 'email' 
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
