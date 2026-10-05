export const errorHandler = (
  err,
  req,
  res,
  next
) => {

  console.error(err);

  const statusCode = err.status || err.statusCode || 500;

  // Unexpected (5xx) errors can contain database details such as table or
  // constraint names, so only send a generic message to the client.
  res.status(statusCode).json({
    success: false,
    message:
      statusCode >= 500
        ? "Internal Server Error"
        : err.message || "Something went wrong",
  });
};
