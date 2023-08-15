const GeneralError = require('./GeneralError');

module.exports = class ForbiddenError extends GeneralError {
    constructor(message) {
        super(message);
        this.statusCode = 403;
    }
};