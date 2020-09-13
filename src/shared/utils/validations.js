import { 
            testForCustomRegex,
            testForRegex,
            testForMaxLength,
            testForMinLength,
            testForDOBInputType,
            testForValidDOB 
        } from './validationMethods';

const validations = ( fieldValue, validationsToPerform ) => {
    const errorsOccurred = {};
    const emailRegex = /[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    const actualLength = String(fieldValue).length;
    const defaultMobileRegex = /^[6-9]\d{9}$/;
    const defaultDateRegex = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;

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
        console.log(Number.isInteger(Number(fieldValue)));
        if(validationsToPerform.validMobile === true 
            && (Number.isInteger(Number(fieldValue))
            || !testForRegex(defaultMobileRegex, fieldValue))) {
                errorsOccurred.validMobile = true;
        } else if((validationsToPerform.validMobile instanceof RegExp) 
            && !testForCustomRegex(validationsToPerform.validMobile, fieldValue)) {
                errorsOccurred.validMobile = true;
        }
    }

    // Validation rule for VALIDBIRTHDATE

    if(validationsToPerform.validBirthDate && fieldValue) {
        const fieldvalueArray = fieldValue.split('/');
        if(validationsToPerform.validBirthDate === true) { 
            if(!testForRegex(defaultDateRegex, fieldValue) 
                || !testForDOBInputType(fieldvalueArray)
                || testForValidDOB(fieldvalueArray, ['dd', 'mm', 'yyyy'])) {
                errorsOccurred.validBirthDate = true;
            }
        } else if(typeof(validationsToPerform.validBirthDate) === 'string'){
            const patternToPass = validationsToPerform.validBirthDate.split('-');
            const modifiedPatterns = patternToPass.map(val => {
                if(val === 'mm') {
                    return '(0?[1-9]|1[012])';
                } else if(val === 'dd') {
                    return '(0?[1-9]|[12][0-9]|3[01])';
                } else if(val === 'yyyy') {
                    return '\d{4}';
                }
            });
            const regexDateCustom = new RegExp(`^${modifiedPatterns.join('[\/\-]')}$`);
            if(!testForRegex(regexDateCustom, fieldValue) 
                && !testForDOBInputType(fieldvalueArray)
                && !testForValidDOB(fieldvalueArray, patternToPass)) {
                    errorsOccurred.validBirthDate = true;
            }
        }
    }

    return errorsOccurred;
}

export { validations };