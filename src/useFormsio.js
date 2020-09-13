import { useState, useRef, useEffect } from 'react';
import { 
            splitAString, 
            removeDuplicates, 
            removeInvalidAndSplit, 
            checkValuesValidity,
            mapRegexValidators,
            mapArrayToObj 
        } from './shared/utils/validatorParseMethods';
import { validations } from './shared/utils/validations';

const useFormsio = () => {

    const [ formState, setFormState ] = useState({});
    const refs = useRef({});
    const formStateRef = useRef({});
    const initialValues = {};
    const validationRules = useRef({});

    //////////////////////////////////////////

    // Method to handle change (oninput) event
    // Updates the state, based on the value

    //////////////////////////////////////////

    const handleChange = event => {
        const { name, value, type } = event.target;
        if(type === 'text' || type === 'password' || type === 'email') {
            formStateRef.current[name] = {
                ...formStateRef.current[name],
                pristine: false,
                dirty: true
            }
            setFormState(prevState => {
                const fieldValues = { ...prevState[name] };
                return {
                    ...prevState,
                    [name]: {
                        ...fieldValues,
                        value: value,
                        pristine: fieldValues.pristine ? !fieldValues.pristine : fieldValues.pristine,
                        dirty: fieldValues.dirty ? fieldValues.dirty : !fieldValues.dirty,
                        errors: validations(value, validationRules.current[name])
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
        const refFieldValues = {...formStateRef.current[name]};
        if(refFieldValues.touched === false || refFieldValues.untouched === true) {
            formStateRef.current[name] = {
                ...formStateRef.current[name],
                touched: true,
                untouched: false
            }
            setFormState(prevState => {
                const fieldValues = { ...prevState[name] };
                return {
                    ...prevState,
                    [name]: {
                        ...fieldValues,
                        touched: true,
                        untouched: false
                    }
                }
            });
        }
    }

    useEffect(() => {
        //console.log(formState);
    }, [ formState ]);

    ///////////////////////////////////////////////////////

    // Method that binds the reference with input element.

    ///////////////////////////////////////////////////////

    const register = ( fieldArgs ) => ref => {
        if(fieldArgs && refs.current[fieldArgs.name] === undefined) {
            const { name, validators, initialValue, regexValidators } = fieldArgs;
            validationRules.current[name] = validators || regexValidators ? composeValidators(validators, regexValidators) : {};
            initialValues[name] = initialValue ? initialValue : '';
            refs.current[name] = ref;
            //console.log('Register');
        }
    };
    
    /////////////////////////////////////////////////////////////////////

    // Method that takes validator string as input.
    // And composes them to an Array of objects (i.e., Validation Rules)

    /////////////////////////////////////////////////////////////////////

    const composeValidators = ( validatorStr, regexValidators ) => {
        if(!validatorStr && !regexValidators) return;
        let validatorRules = [];
        let regexValidatorRules = [];
        if(validatorStr) {
            const validatorRulesSplitArray = removeInvalidAndSplit(
                                                splitAString(validatorStr, '|'), ':');
            validatorRules = mapArrayToObj(
                                removeDuplicates(checkValuesValidity(validatorRulesSplitArray))
                            );
        } else {
            validatorRules = [];
        }
        if(regexValidators) {
            regexValidatorRules = mapArrayToObj(
                                    checkValuesValidity(mapRegexValidators(regexValidators))
                                );
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
            if(formStateRef.current && formStateRef.current[refKey] === undefined) {
                const validityBasedOnValidators = Object.keys(validationRules.current[refKey]).length > 0;
                const fieldValues = {
                    value: initialValues[refKey],
                    untouched: true,
                    touched: false,
                    pristine: true,
                    valid: validityBasedOnValidators ? false : true,
                    invalid: validityBasedOnValidators ? true : false,
                    dirty: false,
                    errors: {}
                };
                const { touched, untouched, pristine, dirty, valid, invalid } = fieldValues;
                formStateRef.current[refKey] = {
                    touched,
                    untouched,
                    pristine,
                    dirty,
                    valid,
                    invalid
                };
                setFormState(prevState => {
                    return {
                        ...prevState,
                        [refKey]: {...fieldValues}
                    }
                });
            }
        });
    }, []);
    return [ register, formState, validationRules.current ];
};

export { useFormsio };