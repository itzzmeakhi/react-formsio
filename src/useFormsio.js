import { useState, useRef, useEffect, useCallback } from 'react';
import { 
            splitAString, 
            removeDuplicates, 
            removeInvalidAndSplit, 
            checkValuesValidity,
            mapRegexValidators,
            mapArrayToObj 
        } from './shared/utils/validatorParseMethods';
import { validators } from './shared/utils/validators';
import { regexAcceptedValidators } from './shared/utils/acceptedValidators';

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
            const { name, validators, initialValue, regexValidators } = fieldArgs;
            validationRules[name] = validators || regexValidators ? composeValidators(validators, regexValidators) : {};
            initialValues[name] = initialValue ? initialValue : '';
            refs.current[name] = ref;
            //console.log('Register');
        }
    }, []);
    
    /////////////////////////////////////////////////////////////////////

    // Method that takes validator string as input.
    // And composes them to an Array of objects (i.e., Validation Rules)

    /////////////////////////////////////////////////////////////////////

    const composeValidators = ( validatorStr, regexValidators ) => {
        if(!validatorStr && !regexValidators) return;
        let validatorRules = [];
        let regexValidatorRules = [];
        if(validatorStr) {
            const validatorRulesSplitArray = removeInvalidAndSplit(splitAString(validatorStr, '|'), ':');
            validatorRules = mapArrayToObj(checkValuesValidity(removeDuplicates(validatorRulesSplitArray)));
        } else {
            validatorRules = [];
        }
        if(regexValidators) {
            regexValidatorRules = mapArrayToObj(checkValuesValidity(mapRegexValidators(regexValidators)));
        } else {
            regexValidatorRules = [];
        }
        return Object.assign({}, ...validatorRules.concat(regexValidatorRules));
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
                const validityBasedOnValidators = Object.keys(validationRules[refKey]).length > 0;
                setFormState(prevState => {
                    return {
                        ...prevState,
                        [refKey]: {
                            value: initialValues[refKey],
                            untouched: true,
                            touched: false,
                            pristine: true,
                            valid: validityBasedOnValidators ? false : true,
                            invalid: validityBasedOnValidators ? true : false,
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