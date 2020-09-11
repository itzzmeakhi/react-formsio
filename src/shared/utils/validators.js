const validators = ( fieldValue, validationsToBeDone ) => {

    const errorsOccurred = {};
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    
    // Convert Array of objects to Object of objects
    const validationsToPerform = Object.assign({}, ...validationsToBeDone);

    if(validationsToPerform.required && !fieldValue) {
        errorsOccurred.required = true;
    }

    return errorsOccurred;
}

export { validators };