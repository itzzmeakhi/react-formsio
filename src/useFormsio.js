import React, { useState, useRef, useEffect, useCallback } from 'react';
import { splitAString, removeDuplicates, removeInvalidAndSplit, checkValuesValidity } from './shared/utils/validatorParseMethods';
import { validators } from './shared/utils/validators';
import  { acceptedValidators } from './shared/utils/acceptedValidators';

const useFormsio = () => {

    const [ formState, setFormState ] = useState({});
    const refs = useRef({});
    const initialValues = {};
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
            const { name, validations, initialValue, regexValidations } = fieldArgs;
            validationRules[name] = validations ? composeValidations(validations, regexValidations) : [];
            initialValues[name] = initialValue ? initialValue : '';
            refs.current[name] = ref;
            //console.log('Register');
        }
    }, []);
    
    /////////////////////////////////////////////////////////////////////

    // Method that takes validator string as input.
    // And composes them to an Array of objects (i.e., Validation Rules)

    /////////////////////////////////////////////////////////////////////

    const composeValidations = ( validationStr, regexValidations ) => {
        if(!validationStr) return;
        const validationRulesSplitArray = removeInvalidAndSplit(splitAString(validationStr, '|'), ':');
        const validationRulesArray = checkValuesValidity(removeDuplicates(validationRulesSplitArray));
        console.log(validationRulesArray);

        // if(regexValidations) {
        //     Object.keys(regexValidations).map(rgxVdtrKey => {
        //         if(acceptedValidators[rgxVdtrKey] === undefined) {
        //             validationEntryErrors.push({
        //                 validation: rgxVdtrKey,
        //                 message: `${invalidRule}`
        //             });
        //         } else {
        //             if(validationRules[rgxVdtrKey]) {
        //                 delete validationRules.rgxVdtrKey;
        //                 validationEntryErrors
        //                     .push(
        //                         {
        //                             validation: rgxVdtrKey,
        //                             message: 'Validation declared multiple times.'
        //                         }
        //                     )
        //             } else {
        //                 validationRules.push({ [rgxVdtrKey]: regexValidations[rgxVdtrKey] });
        //             }
        //         }
        //     });
        // }
        console.log(validationRules);
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