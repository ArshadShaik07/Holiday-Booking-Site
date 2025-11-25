import jwt from "jsonwebtoken";

function authUser(req, res, next) {
	const authHeader = req.headers["authorization"];
	if (!authHeader) throw Error("Unauthorised");
	const accessToken = authHeader.split(" ")[1];

	try {
		const decoded = jwt.verify(
			accessToken,
			process.env.ACCESS_TOKEN_SECRET
		);
		req.user = decoded;
		return next();
	} catch (err) {
		const msg =
			err.name === "TokenExpiredError"
				? "Token expired"
				: "Invalid token";
		const error = new Error(msg);
		error.status = 401;
		next(error);
	}
}

export { authUser };
