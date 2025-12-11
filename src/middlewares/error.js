import ValidationError from "../errors/Validation.js";
const errorMiddleware = (err, _, res, __) => {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json({
      success: false,
      message: "Validation Error",
      errors: err.errors,
    });
  }

  const statusCode = res.statusCode ?? res.statusCode ?? 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Something went wrong",
    // stack: process.env.NODE_ENV === "production" ? null : err.stack,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
    error: err.errors
      ? Object.values(err.errors).map((error) => error.message)
      : null,
  });
};

export default errorMiddleware;
