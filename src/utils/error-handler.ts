const errorHandler = (error: Error) => {
  console.error(error);
  // Log error to server or analytics platform
  throw error;
};

export default errorHandler;
