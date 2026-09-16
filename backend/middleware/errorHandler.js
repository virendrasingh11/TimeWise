// Central Error Handler
const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log error for server debugging

    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    
    // Safely format the error for the client
    res.status(statusCode).json({
        message: err.message || "Internal Server Error",
        // Only show stack in development
        stack: process.env.NODE_ENV === "production" ? null : err.stack
    });
};

const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

module.exports = { errorHandler, notFound };
