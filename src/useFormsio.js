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
    const isFormValid = useRef(false);
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
        'url',
        'select',
        'textarea'
    ];

    //////////////////////////////////////////

    // Method to handle change (oninput) event
    // Updates the state, based on the value

    //////////////////////////////////////////

    const handleChange = event => {
        console.log('Yes');
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
            const errorsAvailable = validations(fieldValue, validationRules.current[name], type);
            const haveErrors = Object.keys(errorsAvailable).length > 0;
            formStateRef.current[name] = {
                ...formStateRef.current[name],
                invalid: haveErrors,
                valid: !haveErrors
            }
            checkFormValidity();
            return {
                ...prevState,
                [name]: {
                    ...fieldValues,
                    value: fieldValue,
                    pristine: fieldValues.pristine ? !fieldValues.pristine : fieldValues.pristine,
                    dirty: fieldValues.dirty ? fieldValues.dirty : !fieldValues.dirty,
                    errors: {...errorsAvailable},
                    invalid: haveErrors,
                    valid: !haveErrors
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

    ////////////////////////////////////////////////

    // Method that checks and sets the form validity

    ////////////////////////////////////////////////

    const checkFormValidity = () => {
        const formStateKeys = Object.keys(formStateRef.current);
        if(formStateKeys.length !== 0) {
            const truthValueArray = formStateKeys
                                        .filter(key => {
                                            return formStateRef.current[key].invalid ? true : false;
                                        });
            isFormValid.current = truthValueArray.length > 0 ? false : true;
        }
    }

    useEffect(() => {
        //checkFormValidity();
    }, [ formState ]);

    ///////////////////////////////////////////////////////

    // Method that binds the reference with input element.

    ///////////////////////////////////////////////////////

    const register = ( fieldArgs ) => ref => {
        if(ref) {
            let type = '';
            const tagName = document.getElementsByName(ref.name)[0].tagName.toLowerCase();
            type = (tagName === 'select' || tagName === 'textarea') ? tagName : ref.type;
            if(supportedFields.includes(type)) {
                let refName = type === 'radio' ? ref.id : ref.name;
                if(refs.current[refName] === undefined) {
                    const validators = fieldArgs?.validators ? fieldArgs?.validators : null;
                    const regexValidators = fieldArgs?.regexValidators ? fieldArgs?.regexValidators : null;
                    const initialValue = fieldArgs?.initialValue ? fieldArgs?.initialValue : '';
                    let objAfterComposed = (validators || regexValidators) ? 
                                                                composeValidators(validators, regexValidators, type) 
                                                                : {};
                    if(type === 'checkbox' || type === 'radio' || type === 'select' || type === 'file' || type === 'range') {
                        objAfterComposed = Object.keys(objAfterComposed).reduce((acc, val) => {
                            if(val === 'required') {
                                return {
                                    ...acc,
                                    [val]: objAfterComposed[val]
                                }
                            } else return acc;
                        }, {});
                    }
                    let name = ref.name;
                    validationRules.current[name] = objAfterComposed;
                    if(type === 'radio') name = ref.id;
                    initialValues[name] = initialValue ? initialValue : '';
                    refs.current[name] = ref;
                } 
            } 
        }
    };
    
    /////////////////////////////////////////////////////////////////////

    // Method that takes validator string as input.
    // And composes them to an Array of objects (i.e., Validation Rules)

    /////////////////////////////////////////////////////////////////////

    const composeValidators = ( validatorStr, regexValidators, type ) => {
        let validatorRules = [];
        let regexValidatorRules = [];
        if(type) {
            if(validatorStr) {
                const validatorRulesSplitArray = removeInvalidAndSplit(
                                                    splitAString(validatorStr, '|'), ':');
                validatorRules = mapArrayToObj(
                                    removeDuplicates(checkValuesValidity(validatorRulesSplitArray, type))
                                );
            } else {
                validatorRules = [];
            }
            if(regexValidators) {
                regexValidatorRules = mapArrayToObj(
                                        checkValuesValidity(mapRegexValidators(regexValidators), type)
                                    );
            } else {
                regexValidatorRules = [];
            }
        }
        return Object.assign({}, ...validatorRules.concat(regexValidatorRules));
    }

    ///////////////////////////////////////////

    // Method that sets the initial form state.

    ///////////////////////////////////////////

    useEffect(() => {
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
                        const validityBasedOnValidators = Object.keys(validationRules.current[refCompoundName]).length > 0;
                        formStateRef.current[refCompoundName] = {
                            touched: false,
                            untouched: true,
                            pristine: true,
                            dirty: false,
                            invalid: validityBasedOnValidators,
                            valid: !validityBasedOnValidators
                        };
                        setFormState(prevState => {
                            if(radioChild === true) {
                                return {
                                    ...prevState,
                                    [refCompoundName]: {
                                        ...prevState[refCompoundName],
                                        invalid: validityBasedOnValidators,
                                        valid: !validityBasedOnValidators,
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
                                        invalid: validityBasedOnValidators,
                                        valid: !validityBasedOnValidators,
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
                                        ...fieldValues,
                                        invalid: validityBasedOnValidators,
                                        valid: !validityBasedOnValidators
                                    }
                                }
                            }
                        });
            }
        });
    }, []);

    return { 
            register, 
            formState, 
            validationRules: validationRules.current, 
            isFormValid: isFormValid.current 
        };
};

export { useFormsio };