const GeneralError = require('./GeneralError');

export default class BadRequestError extends GeneralError {
    constructor(message: string) {
        super(message);
        this.statusCode = 400;
    }
};