const responseMiddleware = (req, res, next) => {
  // TODO: Implement middleware that returns result of the query
  res.send(res.body);
};

exports.responseMiddleware = responseMiddleware;
