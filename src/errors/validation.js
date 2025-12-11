class ValidationError extends Error {
  constructor(errorsOrMessage = [], mayBeErrors = []) {
    const message =
      typeof errorsOrMessage === "string"
        ? errorsOrMessage
        : "Validation failed";
    const errors =
      typeof errorsOrMessage === "string"
        ? Array.isArray(mayBeErrors)
          ? mayBeErrors
          : []
        : Array.isArray(errorsOrMessage)
        ? errorsOrMessage
        : [];
    super(message);
    this.name = "ValidationError";
    this.statusCode = 400;
    this.errors = errors;
  }
}
export default ValidationError;
