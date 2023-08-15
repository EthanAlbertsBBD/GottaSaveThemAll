const GeneralError = require('./GeneralError');

module.exports = (err, req, res, next) => {
    logger.error(err);
    const returnValue = {
        status: 500,
        message: 'Internal server error',
    };
    if (err instanceof GeneralError) {
        returnValue.status = err.getStatus();
        returnValue.message = err.message;
    }
    res.status(returnValue.status).send({ error: returnValue.message });
};