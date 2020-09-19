## API

- [useFormsio](#useFormsio)
    - [register](#register)
    - [formState](#formState)
    - [validationRules](#validationRules)
    - [isFormValid](#isFormValid)
- [register](#register)
    - [validators](#validators)
    - [regexValidators](#regexValidators)
    - [initialValue](#initialValue)
- [Validation Rules supported](#Validation Rules supported)


### useFormsio
It is a named export, can be imported as follows.
```jsx
import { useFormsio } from 'react-formsio';
```
useFormsio is to be used to initialize a form, where it accepts no other parameters but returns an object having the following keys.

```jsx
const { register,
        formState,
        validationRules,
        isFormValid } = useFormsio();
```
* __register__ - It is a reference to register the input field with react-formsio.
* __formState__ - It is an object that holds the state of form.
* __validationRules__ - It is an object that holds all accepted validation rules for each input field.
* __isFormValid__ - It holds the validity of form based on validation rules declared.

### register

This reference method accepts an object with three optional parameters. These parameters include initialValue, validators, regexValidators. 

Even though you have decided not to have validations to any form field, it should get registered with react-formsio to have a benefit of controlled inputs and get its value included in the formState.

 __Note:__  
 1) *To register a form field, it must have a name attribute.*
2) *For radio group, in addition to name attribute, each radio field must have an id.*

_If a form field doesn't need any validations, register the form field reference in the following way._

```jsx
<input 
    type = 'text'
    name = 'userName'
    ref = {
        register()
    } />
```

_To add validation to the field reference, register the field reference in the following way._

```jsx
<input
    type = 'text'
    name = 'userName'
    ref = {
        register({
            validators: 'required|maxLength:5'
        })
    } />
```

The optional object passed to the register method can have three keys, which are optional based on your form field requirements.
- validators
- regexValidators
- initialValue

```jsx
<input
    type = 'number'
    name = 'userContact'
    ref = {
        register({
            validators: 'required|minLength:5',
            regexValidators: {
                validMobile: true
            },
            initialValue: '98'
        })
    }
```

### validators 

It takes validator string as an value and applies the valid one's to the form field.
```jsx
register({
    validators: 'required|minLength:5|maxLength:8|email'
})
```
It supports required, email, maxLength and minLength validators.

The validator string passed will undergo validator checks and filters out all invalid rules, duplicates and falsy rules. Only accepted validation rules are applied to the form field.

*__Key Points:__* 

-> *__`required` & `email` must have no arg or boolean true as an arg.__*

*Valid Rules*
```
validators: 'required|email:true'
```

*Invalid Rules*
```
validators: 'required:'1'|email:false
```
-> *__`maxLength` & `minLength` must have an integer as an arg.__*

*Valid Rules*
```
validators: minLength:6|maxLength:8
```

*Invalid Rules*
```
validators: minLength:false|minLength:ab
```

### regexValidators

It takes regex based validators as an object and applies valid one's to the form field.

```jsx
register({
    regexValidators: {
        passwordStrength: true,
        pattern: /^[1-9][0-9]{5}$/,
        validBirthDate: 'mm-yyyy-dd',
        validMobile: true
    }
})
```

It supports passwordStrength, pattern, validBirthDate and validMobile validator rules.

The validator string passed will undergo validator checks and filters out all invalid rules, duplicates and falsy rules. Only accepted validation rules are applied to the form field.

*__Key points:__*

-> *__`pattern` must have a regex as an arg.__*

*Valid Rules*
```
regexValidators: {
    pattern: /^[1-9][0-9]{5}$/
}
```

*Invalid Rules*
```
regexValidators: {
    pattern: false ( other than regex, any value is invalid )
}
```
-> *__`validMobile` must have a boolean true as an arg (for indian numbers) or must have an regex as an arg.__*

*Valid Rules*
```
regexValidators: {
    validMobile: true,
    validMobile: /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/
}
```

*Invalid Rules*
```
regexValidators: {
    validMobile: false
}
// Other than Regex or boolean true, any other value is invalid
```

-> *__`passwordStrength` and `validBirthDate` must have boolean true as an arg( for default format) or a custom pattern string.__*

*Valid Rules*
```
regexValidators: {
    passwordStrength: true,
    validBirthDate: true,
    passwordStrength: 'Lc:2|Uc:3|L:8',
    validBirthDate: 'mm-dd-yyyy'
}
```

*Invalid Rules*
```
regexValidators: {
    passwordStrength: false,
    validBirthDate: false,
    passwordStrength: 'abc',
    validBirthDate: 'mm-dd'
}
```
*Check below to know more about validators supported, and rules for constructing custom pattern for regexValidators.*

### initialValue

When using react-formsio, there is no need of chaining an `value` attribute to the HTML form field. React-formsio will take care of it internally. If your field to have any initial value, pass it with initialValue as below.

*The initial value of field is set to the value you have passed, or it is an empty string by default*

```jsx
register({
    initialValue: '2'
})
```

### Validation Rules supported

#### required 

A Boolean which, if true, indicates that the input must have a value before the form can be submitted.

```
<input
	type = 'text'
	name = 'userName'
	ref = { register({
            validators: 'required' }) }
	autoComplete = 'off' />
```

#### email

A Boolean which, if true, indicates the input must be an valid email before the form can be submitted.

```
<input
	type = 'email'
	name = 'userEmail'
	ref = { register({
            validators: 'required|email' }) }
	autoComplete = 'off' />
```

#### minLength

The minimum length of the field value, to accept for this input.
```
<input
	type = 'name'
	name = 'userName'
	ref = { register({
            validators: 'required|minLength:6' }) }
	autoComplete = 'off' />
```

#### maxLength

The maximum length of the field value, to accept for this input.
```
<input
	type = 'name'
	name = 'userName'
	ref = { register({
            validators: 'required|minLength:6|maxLength:8' }) }
	autoComplete = 'off' />
```

#### pattern

The field value should match with the passed regex, to accept for this input.
```
<input
	type = 'text'
	name = 'postalCode'
	ref = { register({
        validators: 'required',
        regexValidators: {
            pattern: /^[1-9][0-9]{5}$/ }}) }
	autoComplete = 'off' />
```

#### validMobile

It can be used in a default way or can pass a custom regex, to match and accept the input.

__`validMobile`__: true - Matches the Indian mobile numbers.\
__`validMobile`__: /regex pattern/ - Matches the mobile numbers, based on regex passed.

**_Default validMobile rule_**
```
<input
	type = 'text'
	name = 'userNumber'
	ref = { register({
        validators: 'required',
        regexValidators: {
            validMobile: true }
	autoComplete = 'off' />
```

**_Custom validMobile rule_**\
_This regex I have passed matches the US phone numbers._
```
<input
	type = 'text'
	name = 'userNumber'
	ref = { register({
        validators: 'required',
        regexValidators: {
            validMobile: /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/ }
	autoComplete = 'off' />
```
#### validBirthDate

It can be used in a default way or can pass a custom regex, to match and accept the input.

__`validBirthDate`__: true - Checks for invalid date (Input must be of dd/mm/yyyy format) for all fields, except date field.\
__`validBirthDate`__: /pattern string/ 

_Input field of type date has predefined format, and validation rule will work based on that for date field_

**_Constructing pattern string_**

* For Date - dd
* For Month - mm
* For Year - yyyy

So if you passed mm-dd-yyy as pattern, the input field should be mm/dd/yyyy, else it shown an validBirthDate error during validation.

**Note**: `validBirthDate` with custom pattern string can't be used with input type of `date`, as it has format restrictions. You can use `validBirthDate`: true (default) validation with it.

**_Default validBirthDate rule_**
```
<input
	type = 'date'
	name = 'userDOB'
	ref = { register({
        validators: 'required',
        regexValidators: {
            validBirthDate: true }
	autoComplete = 'off' />
```
**_Custom validBirthDate rule_**
```
<input
	type = 'text'
	name = 'userDOB'
	ref = { register({
        validators: 'required',
        regexValidators: {
            validBirthDate: 'mm-dd-yyyy' }
	autoComplete = 'off' />
```

#### passwordStrength

It can be used in a default way or can pass a rules, to check the password strength and accept the input.

**`passwordStrength`**: true - Checks whether password has minimum of 3 Uppercase letters,
2 Lowercase letters, 2 Digits, 1 Symbol i.e., Any one among these symbols * ! @ # $ & and mimimum 8 character's in length

**`passwordStrength`**: /pattern string/

**_Constructing pattern string_**

* Uc - Uppercase letters
* Lc - Lowercase letters
* L - Minimum Length
* D - Digits
* S - Symbols

You can pass like Uc:2, which indicates password should contain minimum 2 Uppercase letters. 
And can chain multiple rules into a string like 'Lc:4|Uc:2|L:8'.

**_Default passwordStrength rule_**
```
<input
	type = 'password'
	name = 'userPassword'
	ref = { register({
        validators: 'required',
        regexValidators: {
            passwordStrength: true }
	autoComplete = 'off' />
```

**_Custom passwordStrength rule_**
```
<input
	type = 'password'
	name = 'userPassword'
	ref = { register({
        validators: 'required',
        regexValidators: {
            passwordStrength: 'Lc:2|Uc:2|L:8' }
	autoComplete = 'off' />
```

## formState

It is an object that includes all form field values. Each form field is an oject with the following values, which will be updated based on the interaction with the form field.

_For example you have created a form with userName, the formState object is as below._

```
{
    userName: {
        value: '',
        dirty: true,
        pristine: false,
        invalid: true,
        valid: false,
        errors: { required: true },
        touched: true,
        untouched: false
    }
}
```
Here
* value - is the field value
* errors - is an object, that contains errors if available
* pristine - value in the field is not changed
* dirty - value in the field is changed
* valid - no validation errors
* invalid - if there are any validation errors
* touched - input field is focussed, atleast once
* untouched - input field is not focussed, atleast once

## validationRules

It is an object holding all the valid validation rules that are applied to each form field. Invalid rules which met the below mentioned conditions are filtered out. So be careful while defining the validation rules for form fields. Using `validationRules` you can check the validations that are being applied to each individual field.

*__Note__:*
* All invalid rules or other than the supported rules are filtered out
* Rules with invalid args are filtered out
* For radio, checkbox, range, select, file form fields only required validation rule is applied. Remaining rules are filtered out for those mentioned fields.
* For date form field, validBirthDate with pattern string is not applied.

## isFormValid

isFormValid is a boolean value, that indicates the validity of entire form.

##### > As of now, react-formsio supports only the following form fields.
* input[type='checkbox']
* input[type='radio']
* input[type='tel']
* input[type='text']
* input[type='password']
* input[type='email']
* input[type='date']
* input[type='number']
* input[type='range']
* input[type='file']
* input[type='url']
* select
* textarea