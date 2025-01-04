const User = require('../models/user');
const { check } = require('express-validator');

const userCredentialValidation = () => {
    return [
        check('username').custom(async (value, { req }) => {
            const errors = [];

            // Check if the username is empty
            if (!value.trim()) {
                errors.push('Username is required');
            }

            // Check if the password is empty
            if (!req.body.password || !req.body.password.trim()) {
                errors.push('Password is required');
            }

            // If no other errors, proceed to validate credentials
            if (errors.length === 0) {
                const user = await User.findOne({ username: value });
                if (!user || user.password !== req.body.password) {
                    errors.push('Username or password incorrect');
                }
            }

            // If there are errors, reject the Promise with an error
            if (errors.length > 0) {
                return Promise.reject(errors[0]); // Return the first error message
            }
        })
    ];
};

module.exports = userCredentialValidation;
