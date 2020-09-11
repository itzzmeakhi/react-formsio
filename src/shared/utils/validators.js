const validators = ( fieldValue, validationsToBeDone ) => {

    const errorsOccurred = {};
    const emailRegex = /[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    const actualLength = String(fieldValue).length;
    
    // Convert Array of objects to Object of objects
    const validationsToPerform = Object.assign({}, ...validationsToBeDone);
    // console.log(validationsToPerform);

    // Validation rule for REQUIRED

    if(validationsToPerform.required && !fieldValue) {
        errorsOccurred.required = true;
    }

    // Validation rule for EMAIL

    if(validationsToPerform.email && fieldValue && !emailRegex.test(String(fieldValue))) {
        errorsOccurred.email = true;
    }

    // Validation rule for MAXLENGTH

    if(validationsToPerform.maxLength && fieldValue && !(actualLength <= +validationsToPerform.maxLength)) {
        errorsOccurred.maxLength = {
            actualLength,
            requiredLength: +validationsToPerform.maxLength
        }
    } 

    // Validation rule for MINLENGTH

    if(validationsToPerform.minLength && fieldValue && !(actualLength >= +validationsToPerform.minLength)) {
        errorsOccurred.minLength = {
            actualLength,
            requiredLength: +validationsToPerform.minLength
        }
    }

    return errorsOccurred;
}

export { validators };