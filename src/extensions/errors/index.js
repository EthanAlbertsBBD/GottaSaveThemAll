const ResourceNotFoundError = require('./ResourceNotFoundError');
const GeneralError = require('./GeneralError');
const ForbiddenError = require('./ForbiddenError');
const BadRequestError = require('./BadRequestError');

module.exports = {
    GeneralError,
    ResourceNotFoundError,
    ForbiddenError,
    BadRequestError,
};