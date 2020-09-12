import { acceptedValidators, regexAcceptedValidators } from './acceptedValidators';

// Method that checks for the presence of operators
// And slices the string based on the operator passed

export const splitAString = (validatorString, op) => {
    return validatorString.split(op);
}

// Method that removes the invalid validation rules
// Also removes the rule with invalid arguments
// And splits the string based on the passed

export const removeInvalidAndSplit = (validatorStringArray, op) => {
    const validatorsAfterRemoval = validatorStringArray
                                    .map(key => key.includes(':') ? key.split(':') : [key, true])
                                    .filter(keyArray => {
                                        if(acceptedValidators[keyArray[0]] === undefined || keyArray.length > 2) {
                                            return false;
                                        }
                                        return true;
                                    });
    return validatorsAfterRemoval;
} 

// Method that removes the duplicate validation rules
// It keeps the last inputted validation rule
// And omits all duplicates

export const removeDuplicates = (validatorStringArray) => {
    const keysLength = validatorStringArray.length;
    return validatorStringArray.filter((key, index) => {
        const keyFieldValue = key[0];
        for(let i=index+1; i<keysLength; i++) {
            const iteratedFieldValue  = validatorStringArray[i][0];
            if(iteratedFieldValue.includes(keyFieldValue) || keyFieldValue.includes(iteratedFieldValue)) {
                return false;
            }
        }
        return true;
    });
}

export const checkValuesValidity = (validatorStringArray) => {
    return validatorStringArray.filter(item => {
        if(item[0] === 'required') return item[1] === true ? true : false;
        if(item[0] === 'email') return item[1] === true ? true : false;
        if(item[0] === 'maxLength') return Number.isInteger(Number(item[1])) ? true : false;
        if(item[0] === 'minLength') return Number.isInteger(Number(item[1])) ? true : false;
        return true;
    });
}

