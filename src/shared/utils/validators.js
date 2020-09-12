const validators = ( fieldValue, validationsToPerform ) => {

    const errorsOccurred = {};
    const phoneRegex = /^[6789]\d{9}$/;
    const emailRegex = /[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    const actualLength = String(fieldValue).length;

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

    // Validation rule for PATTERN

    if(validationsToPerform.pattern && fieldValue) {
        const regexPattern = new RegExp(validationsToPerform.pattern);
        if(!regexPattern.test(fieldValue)) {
            errorsOccurred.pattern = true;
        }
    }

    // Validation rule for VALIDMOBILE

    if(validationsToPerform.validMobile && fieldValue) {

    }

    return errorsOccurred;
}

export { validators };