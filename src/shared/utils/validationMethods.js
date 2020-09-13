export const testForCustomRegex = (regex, value) => {
    const regexPattern = new RegExp(regex);
    console.log(regexPattern);
    return regexPattern.test(value) ? true : false;
}

export const testForRegex = (regex, value) => {
    return regex.test(value) ? true : false;
}

export const testForMaxLength = (actualLength, requiredLength) => {
    return actualLength <= requiredLength;
}

export const testForMinLength = (actualLength, requiredLength) => {
    return actualLength >= requiredLength;
}

export const testForDOBInputType = (dobArr) => {
    const truthyArray = dobArr.filter(elem => {
        return Number.isInteger(Number(elem));
    });
    return truthyArray.length < 3 ? false : true;
}

export const testForValidDOB = (dobArr, dobPatternArr) => {
    let birthDate = null;
    let birthMonth = null;
    let birthYear = null;
    let validDate = false;
    let isLeapyear = false;
    let month31 = [1, 3, 5, 7, 8, 10, 12];
    let month30 = [4, 6, 9, 11];
    dobPatternArr.forEach((elem, index) => {
        if(elem === 'mm') birthMonth = Number(dobArr[index]);
        if(elem === 'dd') birthDate = Number(dobArr[index]);
        if(elem === 'yyyy') birthYear = Number(dobArr[index]);
    });
    if(birthYear >= 1950
        && birthYear <= new Date().getFullYear()) {
            if(((birthYear % 4 == 0) && (birthYear % 100 != 0)) || (birthYear % 400 == 0)) {
                isLeapyear = true;
            }
            if(birthYear === new Date().getFullYear()) {
                if(birthDate > new Date().getDate() && birthMonth >= new Date().getMonth()+1) {
                    validDate = true;
                } else if(birthMonth > new Date().getMonth()+1) {
                    validDate = true;
                }
            }
            if(month31.includes(birthMonth) && !birthDate >= 1 && !birthDate <= 31) invalidDate = true;
            if(month30.includes(birthMonth) && !birthDate >= 1 && !birthDate <= 30) invalidDate = true;
            if(birthMonth === 2 && isLeapyear && !birthDate >= 1 && !birthDate <= 29) invalidDate = true;
            if(birthMonth === 2 && !isLeapyear && !birthDate >= 1 && !birthDate <= 28) invalidDate = true;
    } else {
        validDate = true;
    }
    return validDate;
}