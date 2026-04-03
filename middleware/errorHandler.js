const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    const status = err.statusCode || 500;
    const message = err.message || "An unexpected error occurred on the server";

    res.status(status).render("error", {
        title: `Error ${status}`,
        status,
        message,
    });
}

export default errorHandler;
