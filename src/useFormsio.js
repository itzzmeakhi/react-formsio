import React, { useState, useRef, useEffect, useCallback } from 'react';

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
        const { name, value } = event.target;
        setFormState(prevState => {
            const fieldValues = { ...prevState[name] };
            return {
                ...prevState,
                [name]: {
                    ...fieldValues,
                    value: value,
                    pristine: fieldValues.pristine ? !fieldValues.pristine : fieldValues.pristine,
                    dirty: fieldValues.dirty ? fieldValues.dirty : !fieldValues.dirty
                }
            }
        });
    }

    useEffect(() => {
        console.log(formState);
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
            refs.current[refKey].value = initialValues[refKey]
            refs.current[refKey].oninput = handleChange;
            if(!formState[refKey]) {
                setFormState(prevState => {
                    return {
                        ...prevState,
                        [refKey]: {
                            value: initialValues[refKey],
                            touched: false,
                            untouched: true,
                            pristine: true,
                            dirty: false
                        }
                    }
                });
            }
        });
    }, []);

    // useEffect(() => {
    //     //console.log(formState)
    // }, [ formState ]);



    // useEffect(() => {
    //     setFormState(prevState => {
    //         return{
    //             ...prevState,
    //             [fieldState.name]: {
    //                 value: '',
    //                 touched: false,
    //                 untouched: true,
    //                 pristine: true,
    //                 dirty: false
    //             }
    //         }
    //     });
    // }, [fieldState])

    return [ register, formState ];
};

export { useFormsio };