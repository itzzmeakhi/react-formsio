const validators = ( fieldValue, validationsToPerform ) => {

    const errorsOccurred = {};
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if(validationsToPerform.required && !fieldValue) {
        errorsOccurred.required = true;
    }

    return errorsOccurred;
}

export { validators };