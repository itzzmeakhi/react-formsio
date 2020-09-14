import { 
            testForCustomRegex,
            testForRegex,
            testForMaxLength,
            testForMinLength,
            testForDOBInputType,
            composeRulesAndValidate,
            testForValidDOB 
        } from './validationMethods';

const validations = ( fieldValue, validationsToPerform ) => {
    const errorsOccurred = {};
    const emailRegex = /[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    const actualLength = String(fieldValue).length;
    const defaultMobileRegex = /^[6-9]\d{9}$/;
    const defaultDateRegex = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    const defaultPasswordString = 'Lc:2|Uc:3|D:2|S:1|L:8';

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

    // Validation rule for MAX LENGTH

    if(validationsToPerform.maxLength 
        && fieldValue 
        && !testForMaxLength(actualLength, +validationsToPerform.maxLength)) {
            errorsOccurred.maxLength = {
                actualLength,
                requiredLength: +validationsToPerform.maxLength
            }
    } 

    // Validation rule for MIN LENGTH

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

    // Validation rule for VALID MOBILE

    if(validationsToPerform.validMobile && fieldValue) { 
        if(validationsToPerform.validMobile === true) { 
           if(Number.isInteger(Number(fieldValue))) {
               if(!testForRegex(defaultMobileRegex, fieldValue)) errorsOccurred.validMobile = true;
            } else { errorsOccurred.validMobile = true }
        } else if((validationsToPerform.validMobile instanceof RegExp) 
            && !testForCustomRegex(validationsToPerform.validMobile, fieldValue)) {
                errorsOccurred.validMobile = true;
        }
    }

    // Validation rule for VALID BIRTHDATE

    if(validationsToPerform.validBirthDate && fieldValue) {
        let dateToBePassed = null;
        let dateSplitArray = [];
        const fieldvalueArray = fieldValue.split('/');
        if(validationsToPerform.validBirthDate === true) { 
            dateToBePassed = fieldValue;
            dateSplitArray = [...fieldvalueArray];
        } else if(typeof(validationsToPerform.validBirthDate) === 'string'){
            let date = null;
            let month = null;
            let year = null;
            const patternToPass = validationsToPerform.validBirthDate.split('-');
            patternToPass.forEach((val, pos) => {
                if(val === 'dd') date = Number(fieldvalueArray[pos]);
                if(val === 'mm') month = Number(fieldvalueArray[pos]);
                if(val === 'yyyy') year = Number(fieldvalueArray[pos]);
            });
            dateToBePassed = `${date}/${month}/${year}`;
            dateSplitArray = [date, month, year];
        }
        if(!testForRegex(defaultDateRegex, dateToBePassed) || !testForDOBInputType(dateSplitArray) || testForValidDOB(dateSplitArray)) {
            errorsOccurred.validBirthDate = true;
        }
    }

    // Validation rule for PASSWORD STRENGTH

    if(validationsToPerform.passwordStrength 
        && typeof(fieldValue) === 'string'
        && fieldValue) {
            let validationResultObj = {};
            if(typeof(validationsToPerform.passwordStrength) === 'string') {
                validationResultObj = composeRulesAndValidate(
                                        validationsToPerform.passwordStrength, fieldValue);
            } else if(validationsToPerform.passwordStrength === true) {
                validationResultObj = composeRulesAndValidate(defaultPasswordString, fieldValue);
            }
            const errorsIfAvailable = Object.keys(validationResultObj).filter(key => {
                return !validationResultObj[key] ? true : false;
            }).length;
            if(errorsIfAvailable !== 0) {
                errorsOccurred.passwordStrength = {
                    invalid: true,
                    ...validationResultObj
                }
            }
    }
    return errorsOccurred;
}

export { validations };