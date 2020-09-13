const acceptedValidators = {
    required: true,
    email: true,
    maxLength: true,
    minLength: true
};

const regexAcceptedValidators = {
    pattern: true,
    validMobile: true,
    validBirthDate: true,
    passwordStrength: true
}


export { acceptedValidators, regexAcceptedValidators };