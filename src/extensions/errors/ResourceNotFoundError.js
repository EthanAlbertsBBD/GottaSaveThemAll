const GeneralError = require('./GeneralError');

module.exports = class ResourceNotFoundError extends GeneralError {
    constructor(message) {
        super(message);
        this.statusCode = 404;
    }
};