import { acceptedValidators, regexAcceptedValidators } from './acceptedValidators';

//////////////////////////////////////////////////////

// Method that checks for the presence of operators
// And slices the string based on the operator passed

//////////////////////////////////////////////////////

export const splitAString = (validatorString, op) => {
    return validatorString.split(op);
}

/////////////////////////////////////////////////////

// Method that removes the invalid validation rules
// Also removes the rule with invalid arguments
// And splits the string based on the passed

////////////////////////////////////////////////////

export const removeInvalidAndSplit = (validatorStringArray, op) => {
    const validatorsAfterRemoval = validatorStringArray
                                    .map(key => key.includes(':') ? key.split(':') : [key, true])
                                    .filter(keyArray => {
                                        if(acceptedValidators[keyArray[0]] === undefined 
                                            || keyArray.length > 2) {
                                            return false;
                                        }
                                        return true;
                                    });
    return validatorsAfterRemoval;
} 

//////////////////////////////////////////////////////

// Method that removes the duplicate validation rules
// It keeps the last inputted validation rule
// And omits all duplicates

/////////////////////////////////////////////////////

export const removeDuplicates = (validatorStringArray) => {
    const keysLength = validatorStringArray.length;
    return validatorStringArray.filter((key, index) => {
        const keyFieldValue = key[0];
        for(let itr=index+1; itr<keysLength; itr++) {
            const iteratedFieldValue = validatorStringArray[itr][0];
            if(iteratedFieldValue.includes(keyFieldValue) 
                || keyFieldValue.includes(iteratedFieldValue)) {
                return false;
            }
        }
        return true;
    });
}

////////////////////////////////////////////////////////////////

// Method that checks the validity of args passed for each rule
// Omits the rule with invalid or falsy args passed

////////////////////////////////////////////////////////////////

export const checkValuesValidity = (validatorStringArray) => {
    return validatorStringArray.filter(item => {
        if(item[0] === 'required') return item[1] === true ? true : false;
        if(item[0] === 'email') return item[1] === true ? true : false;
        if(item[0] === 'maxLength') return Number.isInteger(Number(item[1])) ? true : false;
        if(item[0] === 'minLength') return Number.isInteger(Number(item[1])) ? true : false;
        if(item[0] === 'pattern') return (item[1] instanceof RegExp) ? true : false;
        if(item[0] === 'validMobile' || item[0] === 'validbirthDate' || item[0] === 'passwordStrength') {
            if(item[1] instanceof RegExp) return true;
            if(item[1] === true) return true;
            return false;
        }
    });
}

///////////////////////////////////////////////////////////////

// Method that does basic check for accepted regex rule or not
// Also map object of object to array of arrays

//////////////////////////////////////////////////////////////

export const mapRegexValidators = (regexValidators) => {
    const regexValidatorKeys = Object.keys(regexValidators);
    return regexValidatorKeys
            .filter(key => {
                return regexAcceptedValidators[key] === undefined ? false : true;
            }).map(key => {
                return [key, regexValidators[key]];
            });
}

///////////////////////////////////

// Method converts array to object

///////////////////////////////////

export const mapArrayToObj = (validatorArray) => {
    return validatorArray.map(key => {
        return { [key[0]]: key[1] };
    });
}

