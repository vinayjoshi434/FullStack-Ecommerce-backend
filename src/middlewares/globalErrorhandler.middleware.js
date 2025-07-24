const errorHandler = (err, req, res, next) => {
    const statusCode = err.statuscode || 500;

    return res.status(statusCode).json({
        statuscode: err.statuscode,
        success: false,
        message: err.message || "Internal Server Error",
        errors: err.errors || [],
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined
    });
};

export default errorHandler;