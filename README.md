# react-formsio

[![npm](https://img.shields.io/npm/v/react-formsio)](https://www.npmjs.com/package/react-formsio)   [![GitHub issues](https://img.shields.io/github/issues/itzzmeakhi/react-formsio)](https://github.com/itzzmeakhi/react-formsio/issues) ![npm](https://img.shields.io/npm/dt/react-formsio) ![GitHub contributors](https://img.shields.io/github/contributors/itzzmeakhi/react-formsio) [![GitHub last commit](https://img.shields.io/github/last-commit/itzzmeakhi/react-formsio)](https://github.com/itzzmeakhi/react-formsio) [![Twitter Follow](https://img.shields.io/twitter/follow/itzzmeakhi?style=social)](https://twitter.com/itzzmeakhi)


Easy to use, and light weight library for form validations in React.

## Motivation

Before jumping to React, I was an Angular Developer. While I was learning React, I was like, "Oh!  Angular kind of validating forms is missing in React", and the result is this library.

## What you can do

1) Instead of importing a wrapper component for each field, add validations to the traditional HTML fields itself.
2) Basic validators like `required`, `email`, `maxLength`, `minLength`, and `pattern` can be applied.
3) In addition to the basic validators, some most used validators like `validMobile`, `validBirthDate`, and `passwordStrength` with customization are applied.
4) Changes uncontrolled inputs to controlled inputs internally, no need for explicitly chaining an `onchange` event. 
5) Pass validation errors to the form to invalidate individual fields.

## Installation
```
npm install react-formsio --save
```

## Usage
### Adding Validation to the HTML text field!
```jsx
import React from 'react';
import './App.css';

import { useFormsio } from 'react-formsio';

const App = () => {
  const { register, 
	  formState, 
	  validationRules, 
	  isFormValid } = useFormsio();
  const { userName } = formState;
	
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

	<button type = 'submit'> Submit </button>
      </form>
    </div>
  )
}

export default App;
```

## 3. More

See the [API/Tutorial](/API.md) for more information.


## License

MIT © [itzzmeakhi](https://github.com/itzzmeakhi)