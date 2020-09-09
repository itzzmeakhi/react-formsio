import React, { useState } from 'react';

import { Form } from './Form';

const useFormsio = () => {

    const [ formState, setFormState ] = useState({});

    const registerField = ( args ) => {
        console.log('triggered');
        return '';
    } 

    const setState = state => {
        setFormState(prevState => {
            return {
                ...prevState,
                ...state
            }
        });
    };

    return [ Form ,registerField ];
}

export { useFormsio };