import React from 'react'

import { useFormsio } from 'react-formsio';
import 'react-formsio/dist/index.css';

import './App.css';

const App = () => {
    // const INITIAL_STATE = {
    //     userName: '',
    //     userEmail: ''
    // };
    const { register, formState, validationRules, isFormValid } = useFormsio();
  
    //console.log('Component');
    console.log(formState);
    console.log(validationRules);
    console.log(isFormValid);

    return(
        <form>
            {/* validators: 'required|minLength:6:8|required:false|xxx:0|minLength:e|minLength:9|maxLength:8' */}
            {/* pincode: ^[1-9][0-9]{5}$   ---- 111111 */}
            {/* /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/   ----  (308)-135-7895 */}
            {/* mm-dd-yyyy || dd-mm-yyyy || yyyy-mm-dd */}
            {/* name: 'userName', 
                                    validators: 'required|maxLength:6:7|minLength:6|maxLength:8|zzz|minLength:5|required:false|maxLength:false', 
                                    regexValidators: { 
                                        pattern: /^(\(+61\)|\+61|\(0[1-9]\)|0[1-9])?( ?-?[0-9]){6,9}$/, 
                                        validBirthDate: true,
                                        validMobile: true, 
                                        zenz: 'mm'  }  */}
            <input
                type = 'text'
                placeholder = 'Enter your name'
                name = 'userName'
                ref = { register({ 
                                    name: 'userName', 
                                    initialValue: 'Akhil',
                                    validators: 'required',
                                    regexValidators: {
                                        pattern: /^[1-9][0-9]{5}$/
                                    }
                                }) }
                autoComplete = 'off' />


            <input
                type = 'email'
                placeholder = 'Enter your Number'
                name = 'userNumber'
                ref = { register({
                                    validators: 'required|email'
                                }) }
                autoComplete = 'off' />

            <input
                type = 'email'
                placeholder = 'Enter your email'
                name = 'userEmail'
                ref = { register() }
                autoComplete = 'off' />

            <input
                type = 'date'
                placeholder = 'Tell us your DOB'
                name = 'userDOB'
                ref = { register({
                                    validators: 'required'
                                }) }
                autoComplete = 'off' />

            <input
                type = 'password'
                placeholder = 'Please provide a password'
                name = 'userPassword'
                ref = { register({
                                    validators: 'required',
                                    regexValidators: { passwordStrength: true }
                                }) }
                autoComplete = 'off' />

            <div>

                <input
                    type = 'checkbox'
                    name = 'userAcceptance'
                    id = 'userAcceptance'
                    ref = { register({
                                        validators: 'required'
                                    })} />
                    <label htmlFor = 'userAcceptance'> I have read all conditions </label>

            </div>

            <div>

                <input
                    type = 'radio'
                    name = 'userGender'
                    id = 'userGenderMale'
                    ref = { register({
                                        validators: 'required:false|required|maxLength:3',
                                        initialValue: 'Male'
                                    }) } />
                <label htmlFor = 'userGenderMale'> Male </label>

                <input
                    type = 'radio'
                    name = 'userGender'
                    id = 'userGenderFemale'
                    ref = { register({
                                        validators: 'required|email',
                                        initialValue: 'Female'
                                    }) } />
                <label htmlFor = 'userGenderFemale'> Female </label>

            </div>

            <select 
                name = 'userExp'
                ref = { register({
                                    validators: 'required'
                                }) } >
                    <option value = ''></option>
                    <option value = 'fresher'> Fresher </option>
                    <option value = 'intermmediate'> Intermmediate </option>
                    <option value = 'experienced'> Experienced </option>
            </select>

            <button
                type = 'submit'>
                    Submit
            </button>

        </form>
    )
}

export default React.memo(App);
