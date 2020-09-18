import React from 'react';
import './App.css';

import { useFormsio } from 'react-formsio';

const App = () => {
	const { register, 
			formState, 
			validationRules, 
			isFormValid } = useFormsio();
    const { userName } = formState;
    console.log(validationRules);
    console.log(formState);
	
	const handleSubmit = event => {
		event.preventDefault();
	}
	return(
		<div className = 'App'>
			<form onSubmit = {handleSubmit} >
				<input
					type = 'text'
					name = 'userName'
					ref = { register({
						validators: 'required|minLength:6'
					}) }
					autoComplete = 'off' />
				{ userName?.errors?.required ? 
                    <p> UserName is required </p> : null }
				{ userName?.errors?.minLength ? 
                    <p> UserName should be of minimum 6 character's length </p> : null }

                <input type = 'radio' name = 'userGender' id = 'userMale' ref = {register({validators: 'required', initialValue: 'Male'})} /> Male
                <input type = 'radio' name = 'userGender' id = 'userFemale' ref = {register({validators: 'required'})} /> Female
                <button type = 'submit'> Submit </button>
			</form>
		</div>
	)
}

export default App;
