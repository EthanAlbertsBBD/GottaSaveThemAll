const GeneralError = require('./GeneralError');

export default class ResourceNotFoundError extends GeneralError {
    constructor(message: string) {
        super(message);
        this.statusCode = 404;
    }
};