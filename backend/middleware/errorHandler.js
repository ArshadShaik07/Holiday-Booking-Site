const errorHandler = (err, req, res, next) => {
	res.status(err.status || 500).json({
		error: err.message || "server error",
		stack: process.env.PROCESS == "production" ? null : err.stack,
	});
};

export { errorHandler };
