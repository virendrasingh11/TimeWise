const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        
        if (error) {
            // Format validation errors cleanly
            const errors = error.details.map((detail) => ({
                message: detail.message,
                field: detail.context.key
            }));
            return res.status(400).json({ errors });
        }
        
        // Input sanitization happens by only picking validated fields in the controller
        next();
    };
};

module.exports = validate;
