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
    const validationRules = useRef({});
    const initialValues = {};
    const supportedFields = [
        'checkbox',
        'radio',
        'text',
        'tel',
        'password',
        'email',
        'number',
        'date',
        'file',
        'range',
        'url'
    ];

    //////////////////////////////////////////

    // Method to handle change (oninput) event
    // Updates the state, based on the value

    //////////////////////////////////////////

    const handleChange = event => {
        const { name, value, type , checked } = event.target;
        const refFieldValues = {...formStateRef.current[name]};
        if(refFieldValues.pristine === false || refFieldValues.dirty === false) {
            formStateRef.current[name] = {
                ...formStateRef.current[name],
                pristine: false,
                dirty: true
            }
        }
        let fieldValue = value;
        if(type === 'checkbox') fieldValue = checked;
        setFormState(prevState => {
            const fieldValues = { ...prevState[name] };
            return {
                ...prevState,
                [name]: {
                    ...fieldValues,
                    value: fieldValue,
                    pristine: fieldValues.pristine ? !fieldValues.pristine : fieldValues.pristine,
                    dirty: fieldValues.dirty ? fieldValues.dirty : !fieldValues.dirty,
                    errors: validations(fieldValue, validationRules.current[name], type)
                }
            }
        });
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
        if(supportedFields.includes(ref?.type)) {
            if(refs.current[fieldArgs?.name] === undefined) {
                const validators = fieldArgs?.validators ? fieldArgs?.validators : '';
                const regexValidators = fieldArgs?.regexValidators ? fieldArgs?.regexValidators : {};
                const initialValue = fieldArgs?.initialValue ? fieldArgs?.initialValue : '';
                let objAfterComposed = validators || regexValidators ? composeValidators(validators, regexValidators) : {};
                if(ref?.type === 'checkbox' || ref?.type === 'radio') {
                    objAfterComposed = Object.keys(objAfterComposed).reduce((acc, val) => {
                        if(objAfterComposed[val] === true) {
                            return {
                                ...acc,
                                [val]: objAfterComposed[val]
                            }
                        } else return acc;
                    }, {});
                }
                let name = ref?.name;
                validationRules.current[name] = objAfterComposed;
                if(ref?.type === 'radio') name = ref?.id;
                initialValues[name] = initialValue ? initialValue : '';
                refs.current[name] = ref;
            } 
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

    const composeValidatorForChecked = ( validatorStr, regexValidators ) => {
        if(!validatorStr && !regexValidators) return;
        let validatorRules = [];
        let regexValidatorRules = [];
        if(validatorStr) {
            const validatorRulesSplitArray = removeInvalidAndSplit(
                                                splitAString(validatorStr, '|'), ':');
            console.log(validatorRulesSplitArray);
            validatorRules = mapArrayToObj(
                                removeDuplicates(checkValuesValidity(validatorRulesSplitArray)));
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
            const fieldName = refs.current[refKey].name;
            if(formStateRef.current 
                && ((formStateRef.current[refKey] === undefined 
                    && formStateRef.current[fieldName] === undefined) 
                    || refs.current[refKey].type === 'radio')) {
                        //const validityBasedOnValidators = Object.keys(validationRules.current[refKey]).length > 0;
                        const fieldValues = {
                            value: initialValues[refKey],
                            untouched: true,
                            touched: false,
                            pristine: true,
                            dirty: false,
                            errors: {}
                        };
                        let refCompoundName = refKey;
                        let radioChild = false;
                        let newRadio = false;
                        let otherThanRadio = false;
                        if(refs.current[refKey].type === 'radio') { 
                            refCompoundName = fieldName; 
                            if(formStateRef.current[refCompoundName] != undefined) radioChild = true;
                            else newRadio = true;
                        } else {
                            otherThanRadio = true;
                        }
                        formStateRef.current[refCompoundName] = {
                            touched: false,
                            untouched: true,
                            pristine: true,
                            dirty: false
                        };
                        setFormState(prevState => {
                            if(radioChild === true) {
                                return {
                                    ...prevState,
                                    [refCompoundName]: {
                                        ...prevState[refCompoundName],
                                        children: {
                                            ...prevState[refCompoundName].children,
                                            [refKey]: true
                                        }
                                    }
                                }
                            } else if(newRadio === true) {
                                return {
                                    ...prevState,
                                    [refCompoundName]: {
                                        ...fieldValues,
                                        value: '',
                                        children: {
                                            [refKey]: true
                                        }
                                    }
                                }
                            } else if(otherThanRadio === true) {
                                return {
                                    ...prevState,
                                    [refCompoundName]: {
                                        ...fieldValues
                                    }
                                }
                            }
                        });
            }
        });
    }, []);

    return [ register, formState, validationRules.current ];
};

export { useFormsio };