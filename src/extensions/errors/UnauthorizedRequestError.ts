const GeneralError = require('./GeneralError');

export default class UnauthorizedRequestError extends GeneralError {
    constructor(message: string) {
        super(message);
        this.statusCode = 401;
    }
};