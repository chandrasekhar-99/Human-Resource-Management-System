exports.success = (res, message, data = {}, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  });
};

exports.error = (res, message = "Internal Server Error", statusCode = 500) => {
  return res.status(statusCode).json({
    success: false,
    message
  });
};
