const { user } = require("../models/user");
const UserService = require("../services/userService");
const validator = require("../services/validateService");

const responseWithError = (res, message, status = 404, messages = null) => {
  const errorBody = {
    error: true,
    message: message,
  };

  if (messages) {
    errorBody.messages = { ...messages };
  }

  res.status(status).send(errorBody);
};

const isUsersExist = (req, res, next) => {
  const users = UserService.getAll();
  if (users) {
    res.body = [...users];
    next();
  } else {
    res.status(404).send({
      message: "Users not found",
      error: true,
    });
  }
};

const isUserExists = (req, res, next) => {
  const user = UserService.search({ id: req.params.id });

  if (user) {
    res.body = user;
    next();
  } else {
    responseWithError(res, "User not found");
  }
};

const createUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during creation
  const data = { ...req.body };
  const messages = [];

  const fieldsToValidate = Object.keys(user).filter((attri) => attri !== "id");

  fieldsToValidate.map((field) => {
    if ((message = validator.validate(field, data, req))) {
      messages.push(message);
    }
  });

  if (
    messages.length === 0 &&
    fieldsToValidate.length === Object.keys(data).length
  ) {
    next();
  } else {
    responseWithError(res, "User entity to create is not valid", 400, messages);
  }
};

const updateUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during update

  const user = UserService.search({ id: req.params.id });

  if (user) {
    createUserValid(req, res, next);
  } else {
    responseWithError(res, "User not found");
  }
};

exports.isUsersExist = isUsersExist;
exports.isUserExists = isUserExists;
exports.responseWithError = responseWithError;
exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;
