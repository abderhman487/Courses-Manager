const {body} = require('express-validator');
const validation = () => {
    return [   
            body('name')
            .notEmpty()
            .withMessage('name is required')
            .isLength({min:2})
            .withMessage('title must be at least 2 digits'),
            body('price')
            .notEmpty()
            .withMessage('price is required')
    ]
}

module.exports = {
    validation
}