module.exports = class GeneralError extends Error {
    constructor(message) {
        super();
        this.message = message;
        this.statusCode = 500;
    }

    getStatus() {
        return this.statusCode;
    }
};