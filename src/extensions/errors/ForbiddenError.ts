const GeneralError = require('./GeneralError');

export default class ForbiddenError extends GeneralError {
    constructor(message: string) {
        super(message);
        this.statusCode = 403;
    }
};