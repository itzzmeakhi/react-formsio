import { splitAString } from './validatorParseMethods';

// Method that converts to regex and tests for Regex

export const testForCustomRegex = (regex, value) => {
    const regexPattern = new RegExp(regex);
    return regexPattern.test(value) ? true : false;
}

// Method for matching the regex

export const testForRegex = (regex, value) => {
    return regex.test(value) ? true : false;
}

// Method for checking for maximum length

export const testForMaxLength = (actualLength, requiredLength) => {
    return actualLength <= requiredLength;
}

// Method for checking for minimum length

export const testForMinLength = (actualLength, requiredLength) => {
    return actualLength >= requiredLength;
}

// Method for checking DOD input type

export const testForDOBInputType = (dobArr) => {
    const truthyArray = dobArr.filter(elem => {
        return Number.isInteger(Number(elem));
    });
    return truthyArray.length < 3 ? false : true;
}

// Method for checking a valid DOB

export const testForValidDOB = (dobArr) => {
    let birthDate = Number(dobArr[0]);
    let birthMonth = Number(dobArr[1]);
    let birthYear = Number(dobArr[2]);
    let inValidDate = false;
    let isLeapyear = false;
    let month31 = [1, 3, 5, 7, 8, 10, 12];
    let month30 = [4, 6, 9, 11];

    if(birthYear >= 1950
        && birthYear <= new Date().getFullYear()
        && Number.isInteger(birthDate)
        && Number.isInteger(birthMonth)
        && Number.isInteger(birthYear)) {
            if(((birthYear % 4 == 0) && (birthYear % 100 != 0)) || (birthYear % 400 == 0)) {
                isLeapyear = true;
            }
            if(birthYear === new Date().getFullYear()) {
                if(birthDate > new Date().getDate() && birthMonth >= new Date().getMonth()+1) {
                    inValidDate = true;
                } else if(birthMonth > new Date().getMonth()+1) {
                    inValidDate = true;
                }
            }
            if(month31.includes(birthMonth)) { 
                if(birthDate < 1 || birthDate > 31) inValidDate = true;
            } else if(month30.includes(birthMonth)) {
                if(birthDate < 1 || birthDate > 30) inValidDate = true;
            } else if(birthMonth === 2 && isLeapyear) { 
                if(birthDate < 1 || birthDate > 29) inValidDate = true;
            } else if(birthMonth === 2 && !isLeapyear) {
                if(birthDate < 1 || birthDate > 28) inValidDate = true;
            } else {
                inValidDate = true;
            }
    } else {
        inValidDate = true;
    }
    return inValidDate;
}

// Method for checking the password strength

export const composeRulesAndValidate = (rulesStr, val) => {
    const rulesSplitArray = splitAString(rulesStr, '|');
    const validationResultArr = rulesSplitArray.map(rule => {
        const fieldvalues = splitAString(rule, ':');
        if(fieldvalues[0] === 'Uc') {
            return { 
                ['hasUpperCase']: testForRegex(new RegExp(`^(.*[A-Z]){${fieldvalues[1]}}.*$`), val)
            };
        } else if(fieldvalues[0] === 'Lc') {
            return { 
                ['hasLowerCase']: testForRegex(new RegExp(`^(.*[a-z]){${fieldvalues[1]}}.*$`), val) 
            };
        } else if(fieldvalues[0] === 'D') {
            return { 
                ['hasNumbers']: testForRegex(new RegExp(`^(.*[0-9]){${fieldvalues[1]}}.*$`), val) 
            };
        } else if(fieldvalues[0] === 'S') {
            return { 
                ['hasSymbols']: testForRegex(new RegExp(`^(.*[*!@#$&*]){${fieldvalues[1]}}.*$`), val) 
            };
        } else if(fieldvalues[0] === 'L') {
            return { 
                ['hasMinimumLength']: testForMinLength(val.length, Number(fieldvalues[1]))
            };
        }
    });
    return Object.assign({}, ...validationResultArr);
}

