export default class GeneralError extends Error {
    message: string;
    statusCode: number;

    constructor(message: string) {
        super();
        this.message = message;
        this.statusCode = 500;
    }

    getStatus(): number {
        return this.statusCode;
    }
};