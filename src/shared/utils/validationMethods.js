
export const testForCustomRegex = (regex, value) => {
    const regexPattern = new RegExp(regex);
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