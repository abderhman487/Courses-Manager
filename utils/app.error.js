class AppError extends Error {
    constructor(message, statusCode, statusMessage) {
        super(message);
        this.statusCode = statusCode;
        this.statusMessage = statusMessage;
    }
}

module.exports = AppError;
