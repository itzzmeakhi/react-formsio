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
            {/* validators: 'required|minLength:6:8|required:false|xyz:0|minLength:e|minLength:9|maxLength:8' */}
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
                type = 'file'
                name = 'userName'
                ref = { register({
                    validators: 'required|minLength:6:8|required:false|xyz:0|minLength:e|maxLength:8|emailu',
                    regexValidators: {
                        validBirthdate: 'mmm-yyy',
                        pattern: 'Hello',
                        validMobile: 'aabs98',
                        passwordStrength: 'Lc:2|xr:2|Uc:a'
                    }
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
