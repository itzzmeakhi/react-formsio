import React, { useState, useRef, useCallback, useEffect } from 'react';

import acceptedValidators from './shared/utils/acceptedValidators';



const useFormsio = () => {

    const [ formState, setFormState ] = useState({});
    const refs = useRef({});
    const initialValues = {};
    const validationEntryErrors = [];
    const validationRules = {};

    const register = useCallback(( fieldArgs ) => ref => {
        if(fieldArgs) {
            const { name, validations, initialValue } = fieldArgs;
            if(validations) { validationRules[name] = composeValidations(validations); }

            validationRules[name] = validations ? validations : [];
            initialValues[name] = initialValue ? initialValue : '';
    
            refs.current[name] = ref;
        }
    }, []);
    
    //////////////////////////////////////////////////////////////////

    // Method that takes validator string as input.
    // And composes them to an Array of objects (i.e., Validation Rules)

    //////////////////////////////////////////////////////////////////

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
                                                        message: `${invalidArgs}` }
                                                );
                                            return false;
                                        } 
                                        if(acceptedValidators[keyAfterSlicing[0]] === -1) {
                                            validationEntryErrors
                                                .push(
                                                    { 
                                                        validation: keyAfterSlicing[0], 
                                                        message: `${invalidRule}` }
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

    // useEffect(() => {
    //     const refsKeys = Object.keys(refs.current);
    //     refsKeys.forEach(refKey => {
    //         if(!formState[refKey]) {
    //             setFormState(prevState => {
    //                 return {
    //                     ...prevState,
    //                     [refKey]: {
    //                         value: '',
    //                         touched: false,
    //                         untouched: true,
    //                         pristine: true,
    //                         dirty: false
    //                     }
    //                 }
    //             });
    //         }
    //     });
    // }, [ refs ]);

    useEffect(() => {
        //console.log(formState)
    }, [ formState ]);



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

    return [ register ];
};

export { useFormsio };