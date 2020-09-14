import { 
            testForCustomRegex,
            testForRegex,
            testForMaxLength,
            testForMinLength,
            testForDOBInputType,
            composeCustomPasswordRules,
            testForValidDOB 
        } from './validationMethods';

const validations = ( fieldValue, validationsToPerform ) => {
    const errorsOccurred = {};
    const emailRegex = /[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    const actualLength = String(fieldValue).length;
    const defaultMobileRegex = /^[6-9]\d{9}$/;
    const defaultDateRegex = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    const defaultPasswordRegex = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/;

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
        if(validationsToPerform.validMobile === true 
            && (Number.isInteger(Number(fieldValue))
            || !testForRegex(defaultMobileRegex, fieldValue))) {
                errorsOccurred.validMobile = true;
        } else if((validationsToPerform.validMobile instanceof RegExp) 
            && !testForCustomRegex(validationsToPerform.validMobile, fieldValue)) {
                errorsOccurred.validMobile = true;
        }
    }

    // Validation rule for VALID BIRTHDATE

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

    // Validation rule for PASSWORD STRENGTH

    if(validationsToPerform.passwordStrength 
        && typeof(fieldValue) === 'string'
        && fieldValue) {
            //let upperCaseRegx = `^(.*[A-Z]){2}.*$`;
            // N 8 Uc 2 Lc 3 Sy 1 Di 2
            // let hasNumbers = false;
            // let hasLowerCase = false;
            // let hasUppercase = false;
            // let hasSymbols = false;
            // let hasMinimumLength = false;
            let upperCaseRegx = '';
            let lowerCaseRegex = '';
            let digitsRegex = '';
            let lengthRegex = '';
            let symbolsRegex = '';
            if(typeof(validationsToPerform.passwordStrength) === 'string') {
                const filteredRegexRules = composeCustomPasswordRules(validationsToPerform.passwordStrength);
                filteredRegexRules.map(regexRule => {
                    if(regexRule.key === 'Uc') {
                        upperCaseRegx = `^(.*[A-Z]){${regexRule.value}}.*$`;
                    } else if(regexRule.key === 'Lc') {
                        lowerCaseRegex = `^(.*[a-z]){${regexRule.value}}.*$`;
                    }
                });
            } else if(validationsToPerform.passwordStrength === true) {
                let hasUpperCase = testForRegex(/^(.*[A-Z]){2}.*$/, fieldValue);
                let hasLowerCase = testForRegex(/^(.*[a-z]){3}.*$/, fieldValue);
                let hasNumbers = testForRegex(/^(.*[0-9]){2}.*$/, fieldValue);
                let hasSymbols = testForRegex(/^(.*[*!@#$&*]){1}.*$/, fieldValue);
                let hasMinimumLength = testForMinLength(fieldValue.length, 8);
                if(!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSymbols || !hasMinimumLength) {
                    errorsOccurred.passwordStrength = {
                        invalid: true,
                        hasLowerCase,
                        hasUpperCase,
                        hasNumbers,
                        hasSymbols,
                        hasMinimumLength
                    };
                }
            }

            // const regexRulesArray = splitAString(validationsToPerform.passwordStrength, '|');
            // const filteredRegexRules = regexRulesArray.filter(regexRule => {
            //     const regexRulesSplit = splitAString(regexRule, ':');
            //     return regexRulesSplit.length > 2 || regexRulesSplit.length < 2 ? false : true;
            // }).map(key => {
            //     const splitKey = splitAString(key, ':');
            //     return { [splitKey[0]]: splitKey[1] }
            // });
            // console.log(filteredRegexRules);
    }

    return errorsOccurred;
}

export { validations };