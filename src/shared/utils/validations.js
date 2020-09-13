import { 
            testForCustomRegex,
            testForRegex,
            testForMaxLength,
            testForMinLength 
        } from './validationMethods';

const validations = ( fieldValue, validationsToPerform ) => {
    const errorsOccurred = {};
    const emailRegex = /[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    const actualLength = String(fieldValue).length;
    const defaultMobileRegex = /^[6-9]\d{9}$/;

    // console.log(validationsToPerform);

    // Validation rule for REQUIRED

    if(validationsToPerform.required 
        && !fieldValue) {
        errorsOccurred.required = true;
    }

    // Validation rule for EMAIL

    if(validationsToPerform.email 
        && fieldValue 
        && !testForRegex(emailRegex, fieldValue)) {
        errorsOccurred.email = true;
    }

    // Validation rule for MAXLENGTH

    if(validationsToPerform.maxLength 
        && fieldValue 
        && !testForMaxLength(actualLength, +validationsToPerform.maxLength)) {
        errorsOccurred.maxLength = {
            actualLength,
            requiredLength: +validationsToPerform.maxLength
        }
    } 

    // Validation rule for MINLENGTH

    if(validationsToPerform.minLength 
        && fieldValue 
        && !testForMinLength(actualLength, +validationsToPerform.minLength)) {
        errorsOccurred.minLength = {
            actualLength,
            requiredLength: +validationsToPerform.minLength
        }
    }

    // Validation rule for PATTERN

    if(validationsToPerform.pattern 
        && fieldValue 
        && !testForCustomRegex(validationsToPerform.pattern, fieldValue)) {
        errorsOccurred.pattern = true;
    }

    // Validation rule for VALIDMOBILE

    if(validationsToPerform.validMobile && fieldValue) { 
        if(validationsToPerform.validMobile === true 
            && Number.isInteger(Number(fieldValue))
            && !testForRegex(defaultMobileRegex, fieldValue)) {
            errorsOccurred.validMobile = true;
        } 
        if(validationsToPerform.validMobile instanceof RegExp 
            && !testForCustomRegex(validationsToPerform.validMobile, fieldValue)) {
            errorsOccurred.validMobile = true;
        }
    }


    return errorsOccurred;
}

export { validations };