const messageList = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    409: "Conflict",
};

const HttpError = (status, message = null) => {
    if (!messageList.hasOwnProperty(status)) {
        throw new Error(`Invalid status code: ${status}`);
    }
    const errorMessage = message || messageList[status];
    const error = new Error(errorMessage);
    error.status = status;
    return error;
};

export default HttpError;