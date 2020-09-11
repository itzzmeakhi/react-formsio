import React, { useState, useRef, useEffect, useCallback } from 'react';

import { validators } from './shared/utils/validators';

import acceptedValidators from './shared/utils/acceptedValidators';

const useFormsio = () => {

    const [ formState, setFormState ] = useState({});
    const refs = useRef({});
    const initialValues = {};
    const validationEntryErrors = [];
    const validationRules = {};

    //////////////////////////////////////////

    // Method to handle change (oninput) event
    // Updates the state, based on the value

    //////////////////////////////////////////

    const handleChange = event => {
        const { name, value, type } = event.target;
        if(type === 'text' || type === 'password' || type === 'email') {
            setFormState(prevState => {
                const fieldValues = { ...prevState[name] };
                return {
                    ...prevState,
                    [name]: {
                        ...fieldValues,
                        value: value,
                        pristine: fieldValues.pristine ? !fieldValues.pristine : fieldValues.pristine,
                        dirty: fieldValues.dirty ? fieldValues.dirty : !fieldValues.dirty,
                        errors: validators(value, validationRules[name])
                    }
                }
            });
        }
    }

    //////////////////////////////////////////

    // Method to handle onclick event
    // Updates the state, based on the value

    //////////////////////////////////////////

    const handleFocus = event => {
        const { name } = event.target;
        setFormState(prevState => {
            const fieldValues = { ...prevState[name] };
            return {
                ...prevState,
                [name]: {
                    ...fieldValues,
                    touched: fieldValues.touched ? fieldValues.touched : !fieldValues.touched,
                    untouched: fieldValues.untouched ? !fieldValues.untouched : fieldValues.untouched
                }
            }
        });
    }

    useEffect(() => {
        // console.log(formState);
    }, [ formState ]);

    ///////////////////////////////////////////////////////

    // Method that binds the reference with input element.

    ///////////////////////////////////////////////////////

    const register = useCallback(( fieldArgs ) => ref => {
        if(fieldArgs && refs.current[fieldArgs.name] === undefined) {
            const { name, validations, initialValue } = fieldArgs;
            validationRules[name] = validations ? composeValidations(validations) : [];
            initialValues[name] = initialValue ? initialValue : '';
            refs.current[name] = ref;

            //console.log('Register');
        }
    }, []);
    
    /////////////////////////////////////////////////////////////////////

    // Method that takes validator string as input.
    // And composes them to an Array of objects (i.e., Validation Rules)

    /////////////////////////////////////////////////////////////////////

    const composeValidations = ( validationStr ) => {
        if(!validationStr) return;
        const invalidArgs = 'Invalid arguements for the validation rule. Please refer the documentation.';
        const invalidRule = 'Invalid validation rule. Please refer the documentation, for supported rules';
        const validationRules = validationStr
                                    .split('|')
                                    .map(key => {
                                        return key.includes(':') ? key.split(':') : [key, true];
                                    })
                                    .filter(keyAfterSlicing => {
                                        if(keyAfterSlicing.length > 2) { 
                                            validationEntryErrors 
                                                .push(
                                                    { 
                                                        validation: keyAfterSlicing[0], 
                                                        message: `${invalidArgs}` 
                                                    }
                                                );
                                            return false;
                                        }
                                        if(acceptedValidators[keyAfterSlicing[0]] === undefined) {
                                            validationEntryErrors
                                                .push(
                                                    { 
                                                        validation: keyAfterSlicing[0], 
                                                        message: `${invalidRule}` 
                                                    }
                                                );
                                            return false;
                                        }
                                        return true;
                                    })
                                    .map(filteredKey => {
                                        return { [filteredKey[0]]: filteredKey[1] }
                                    });
        return validationRules;
    }

    ///////////////////////////////////////////

    // Method that sets the initial form state.

    ///////////////////////////////////////////

    useEffect(() => {
        //console.log('Effect');
        const refsKeys = Object.keys(refs.current);
        refsKeys.forEach(refKey => {
            refs.current[refKey].value = initialValues[refKey];
            refs.current[refKey].oninput = handleChange;
            refs.current[refKey].onfocus = handleFocus;
            if(!formState[refKey]) {
                const validityBasedOnValidations = validationRules[refKey].length > 0;
                setFormState(prevState => {
                    return {
                        ...prevState,
                        [refKey]: {
                            value: initialValues[refKey],
                            untouched: true,
                            touched: false,
                            pristine: true,
                            valid: validityBasedOnValidations ? false : true,
                            invalid: validityBasedOnValidations ? true : false,
                            dirty: false,
                            errors: {}
                        }
                    }
                });
            }
        });
    }, []);
    return [ register, formState ];
};

export { useFormsio };