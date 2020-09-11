import React, { useState } from 'react';

const useForm = () => {

    const [ formState, setFormState ] = useState({});
    const refs = useRef({});

    const register = useCallback(( fieldArgs ) => ref => {
        if(fieldArgs) {
            const { name, validations, initialValue } = fieldArgs;
    
            refs.current[name] = ref;
        }
        console.log('Register rendered');
    }, []);

    // useEffect(() => {
    //     console.log('Effect Rendered');
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

    return [ register ];
}

export { useForm };
