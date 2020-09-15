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
    //console.log(validationRules);

    return(
        <form>
            {/* validators: 'required|minLength:6:8|required:false|xxx:0|minLength:e|minLength:9|maxLength:8' */}
            {/* pincode: ^[1-9][0-9]{5}$   ---- 111111 */}
            {/* /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/   ----  (308)-135-7895 */}
            {/* mm-dd-yyyy || dd-mm-yyyy || yyyy-mm-dd */}
            <input
                type = 'text'
                placeholder = 'Enter your name'
                name = 'userName'
                ref = { register({ 
                                    name: 'userName', 
                                    validators: 'required|maxLength:6:7|minLength:6|maxLength:10|zzz|minLength:8|required:false|maxLength:false', 
                                    regexValidators: { 
                                        pattern: /^[1-9][0-9]{5}$/, 
                                        validBirthDate: true,
                                        validMobile: /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/, 
                                        zenz: 'mm'  } 
                                }) }
                autoComplete = 'off' />

            <input
                type = 'date'
                placeholder = 'Enter your Number'
                name = 'userNumber'
                ref = { register({
                                    name: 'userNumber',
                                    validators: 'required|email',
                                    regexValidators: {
                                        validBirthDate: true
                                    }
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
                type = 'date'
                placeholder = 'Tell us your DOB'
                name = 'userDOB'
                ref = { register({
                                    name: 'userDOB',
                                    validators: 'required',
                                    regexValidators: { validBirthDate: 'yyyy-mm-dd' }
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

            {/* <div>

                <input
                    type = 'checkbox'
                    name = 'userAcceptance'
                    id = 'userAcceptance'
                    ref = { register({
                                        name: 'userAcceptance',
                                        validators: 'required'
                                    })} />
                    <label htmlFor = 'userAcceptance'> I have read all conditions </label>

            </div> */}

            <button
                type = 'submit'>
                    Submit
            </button>

        </form>
    )
}

export default React.memo(App);
