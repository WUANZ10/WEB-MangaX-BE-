export const getValidationErrorDetails = (error) => {
  return error.details.map((detail) => ({
    message: detail.message,
    path: detail.path,
  }));
};