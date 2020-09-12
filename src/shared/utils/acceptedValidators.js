const acceptedValidators = {
    required: true,
    email: true,
    maxLength: true,
    minLength: true
};

const regexAcceptedValidators = {
    pattern: true,
    validMobile: true,
    validbirthDate: true,
    passwordStrength: true
}


export { acceptedValidators, regexAcceptedValidators };