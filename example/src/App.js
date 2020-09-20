import React from "react";
import './App.css'

import { useFormsio } from 'react-formsio';

export default function App() {

  const { register,
          formState,
          isFormValid } = useFormsio();

  const { userName,
          userEmail,
          userPassword,
          userDOB,
          userContactNumber,
          userExperience } = formState;


  // Method to handle form submission

  const handleSubmit = event => {
    event.preventDefault();
    console.log(formState);
  }

  // Method to check whether object is empty or not

  const isEmpty = obj => {
      if(!obj) return true;
      if(Object.keys(obj).length === 0) return true;
      return false;
  }

  return (
    <div className = 'app'>

      <div className = 'header'> 
        <p> Hello React formsio User <span>🤩 </span>!! </p>
      </div>

      <div className = 'form-container'>

        <form>

          {/* userName */}

          <div className = 'form-group'>

            <label htmlFor = 'userName'> Username: </label>

            <input
              type = 'text'
              id = 'userName'
              name = 'userName'
              className = {`${isEmpty(userName?.errors) ? '' : 'error-input'}`}
              ref = {
                register({
                  validators: 'required|minLength:6',
                  initialValue: 'Hello! user'
                })
              }
              autoComplete = 'off' />

          </div>

          {userName?.errors?.required && <p className = 'error'> Username is required. </p>}
          {userName?.errors?.minLength && <p className = 'error'> Minimum {userName?.errors?.minLength?.requiredLength} character's in length. </p>}

          {/* userEmail */}

          <div className = 'form-group'>

            <label htmlFor = 'userEmail'> Email: </label>

            <input
              type = 'email'
              id = 'userEmail'
              name = 'userEmail'
              className = {`${isEmpty(userEmail?.errors) ? '' : 'error-input'}`}
              ref = {
                register({
                  validators: 'required|email'
                })
              }
              autoComplete = 'off' />

          </div>

          {userEmail?.errors?.required && <p className = 'error'> Email is required. </p>}
          {userEmail?.errors?.email && <p className = 'error'> Invalid email. </p>}

          {/* userPassword */}

          <div className = 'form-group'>

            <label htmlFor = 'userPassword'> Password: </label>

            <input
              type = 'password'
              id = 'userPassword'
              name = 'userPassword'
              className = {`${isEmpty(userPassword?.errors) ? '' : 'error-input'}`}
              ref = {
                register({
                  validators: 'required',
                  regexValidators: {
                    passwordStrength: 'Lc:2|Uc:2|D:2|S:1|L:10'
                  }
                })
              }
              autoComplete = 'off' />

          </div>

          {userPassword?.errors?.required && <p className = 'error'> Password is required. </p>}
          {userPassword?.errors?.passwordStrength?.hasLowerCase && <p className = 'error'> Password should have minimum 2 lowercase letters. </p>}
          {userPassword?.errors?.passwordStrength?.hasUpperCase && <p className = 'error'> Password should have minimum 2 uppercase letters. </p>}
          {userPassword?.errors?.passwordStrength?.hasSymbols && <p className = 'error'> Password should have have minumum 1 symbol among these * ! @ # $ & </p>}
          {userPassword?.errors?.passwordStrength?.hasNumbers && <p className = 'error'> Password should have minimum 2 numbers. </p>}
          {userPassword?.errors?.passwordStrength?.hasMinimumLength && <p className = 'error'> Password should be of minimum 10 characters in length. </p>}

          {/* userDOB */}

          <div className = 'form-group'>

            <label htmlFor = 'userDOB'> Date of Birth: </label>

            <input
              type = 'text'
              id = 'userDOB'
              name = 'userDOB'
              className = {`${isEmpty(userDOB?.errors) ? '' : 'error-input'}`}
              placeholder = 'MM/DD/YYYY'
              ref = {
                register({
                  validators: 'required',
                  regexValidators: {
                    validBirthDate: 'mm-dd-yyyy'
                  }
                })
              }
              autoComplete = 'off' />

          </div>

          {userDOB?.errors?.required && <p className = 'error'> Date of Birth is required. </p>}
          {userDOB?.errors?.validBirthDate && <p className = 'error'> Invalid Date of Birth. </p>}

          {/* userContactNumber */}

          <div className = 'form-group'>

            <label htmlFor = 'userContactNumber'> Mobile: </label>

            <input
              type = 'text'
              id = 'userContactNumber'
              name = 'userContactNumber'
              className = {`${isEmpty(userContactNumber?.errors) ? '' : 'error-input'}`}
              ref = {
                register({
                  validators: 'required',
                  regexValidators: {
                    validMobile: true
                  }
                })
              }
              autoComplete = 'off' />

          </div>

          {userContactNumber?.errors?.required && <p className = 'error'> Mobile number is required. </p>}
          {userContactNumber?.errors?.validMobile && <p className = 'error'> Invalid Mobile number. </p>}

          {/* userExperience */}

          <div className = 'form-group'>

            <label htmlFor = 'userExperience'> Experience: </label>

            <select 
              name = 'userExperience' 
              id = 'userExperience'
              className = {`${isEmpty(userExperience?.errors) ? '' : 'error-input'}`}
              ref = {
                register({
                  validators: 'required'
                })
              }>
                <option value = ''></option>
                <option value = 'fresher'>Fresher</option>
                <option value = 'intermmediate'>Intermmediate</option>
                <option value = 'experienced'>Experienced</option>
            </select>

          </div>

          {userExperience?.errors?.required && <p className = 'error'> Experience is required. </p>}

          {/* userGender */}

          <div className = 'checked-group'>

            <label htmlFor = 'userGenderMale'>

              <input
                type = 'radio'
                name = 'userGender'
                id = 'userGenderMale'
                ref = {
                  register({
                    validators: 'required',
                    initialValue: 'Male'
                  })
                } />&nbsp;

              Male 
              
            </label>&nbsp;

            <label htmlFor = 'userGenderFemale'>

              <input
                type = 'radio'
                name = 'userGender'
                id = 'userGenderFemale'
                ref = {
                  register({
                    validators: 'required',
                    initialValue: 'Female'
                  })
                } />&nbsp;

              Female 
              
            </label>

          </div>

          {/* userAcceptance */}

          <div className = 'checked-group'>

            <label htmlFor = 'userAcceptance'> 

              <input
                type = 'checkbox'
                name = 'userAcceptance'
                id = 'userAcceptance'
                ref = {
                  register({
                    validators: 'required'
                  })
                } />&nbsp;
                
              I have read all Terms & Conditions 
               
            </label>

          </div>

          {/* Submit */}

          <button
            type = 'submit'
            disabled = {!isFormValid}
            onClick = {handleSubmit}>
              Submit
          </button>

        </form>

      </div>
    </div>
  );
}
