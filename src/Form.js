import React, { useState, useEffect } from 'react';

const Form = (props) => {

    //const INITIAL_STATE = {};
    //const [ formState, setFormState ] = useState({});

    // useEffect(() => {
    //     props.children.map(child => {
    //         if(child.type === 'input' || child.type === 'textarea' || child.type === 'select') {
    //             console.log(child); 
    //             //const validators = composeValidators(child?.props['data-validations']);
    //             INITIAL_STATE[child.props.name] = {
    //                 value: '',
    //                 touched: false,
    //                 untouched: true,
    //                 pristine: true,
    //                 dirty: false,
    //                 errors: {}
    //             }
    //         }
    //     });
    //     setFormState(prevState => {
    //         return {
    //             ...prevState,
    //             ...INITIAL_STATE
    //         }
    //     });
    // }, []);


    const handleChange = ( event ) => {
        const { name, value } = event.target;
        setFormState(prevState => {
            return {
                ...prevState,
                [name]: {
                    ...prevState[name],
                    value: value,
                    touched: true,
                    untouched: false,
                    pristine: false,
                    dirty: true
                }
            }
        });
    };

    const composeValidators = ( validatorString ) => {
        const validators = [];
        const validatorsArray = validatorString.split('|');
        validatorsArray.map(vdtr => {
            if(vdtr.includes(':')) {
                const [ key, value ] = vdtr.split(':');
                validators.push({ [key]: value} );
            } else {
                validators.push({ [vdtr]: true });
            }
        });
        return validators;
    }

    return(
        <React.Fragment>
            { 
                React.Children.map(props.children, child => {
                    // if(child.type === 'input' || child.type === 'textarea' || child.type === 'select') {
                    //     return React.cloneElement(child, {
                    //         value: formState[child.props.name]?.value || '',
                    //         onChange: handleChange,
                    //     });
                    // }
                    return child;
                })
            }
        </React.Fragment>
    )
}

export { Form };