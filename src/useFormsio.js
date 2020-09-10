import React, { useState, useRef, useCallback, useEffect } from 'react';



const useFormsio = () => {

    const [ formState, setFormState ] = useState({});
    const refs = useRef({});
    const initialValues = {};
    const validationRules = {};

    const register = useCallback(( fieldArgs ) => ref => {
        if(fieldArgs) {
            const { name, validations, initialValue } = fieldArgs;

            validations && composeValidations(validations);

            validationRules[name] = validations ? validations : [];
            initialValues[name] = initialValue ? initialValue : '';
    
            refs.current[name] = ref;

            // if(fieldArgs) {
            //     fieldState = {...fieldArgs};
            // }
        }
    }, []);

    const composeValidations = ( validationStr ) => {
        if(validationStr) {
            const validationStrKeys = validationStr.split('|');
            console.log(validationStrKeys);
        }
    }

    useEffect(() => {
        const refsKeys = Object.keys(refs.current);
        refsKeys.forEach(refKey => {
            if(!formState[refKey]) {
                console.log(initialValues);
                console.log(validationRules);
                setFormState(prevState => {
                    return {
                        ...prevState,
                        [refKey]: {
                            value: '',
                            touched: false,
                            untouched: true,
                            pristine: true,
                            dirty: false
                        }
                    }
                });
            }
        });
    }, [ refs ]);

    useEffect(() => {
        console.log(formState)
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

    return [ refs, register ];
};

export { useFormsio };