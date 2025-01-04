const { check } = require('express-validator');
const path = require('path');

const pageInputValidation = () => {
    return [
        check('title', 'Page Title required!').trim().notEmpty(),
        check('content', 'Page content required!').trim().notEmpty(),
        check('heroImage').custom((value, { req }) => {
            
            if (!req.files || !req.files.heroImage) {
                return Promise.reject('Hero Image required!');
            } else {
                const fileExtension = path.extname(req.files.heroImage.name).toLowerCase();
                const allowedExtensions = ['.png', '.jpg', '.jpeg', '.gif'];

                if (!allowedExtensions.includes(fileExtension)) {
                    return Promise.reject('Invalid file type. Only images are allowed.');
                }
            }
            return true; // Return true if validation passes
        })
    ];
};

module.exports = pageInputValidation;
