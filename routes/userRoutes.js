const { Router } = require("express");
const UserService = require("../services/userService");
const {
  createUserValid,
  updateUserValid,
  isUsersExist,
  isUserExists,
} = require("../middlewares/user.validation.middleware");
const { responseMiddleware } = require("../middlewares/response.middleware");
const { UserRepository } = require("../repositories/userRepository");

const router = Router();

// TODO: Implement route controllers for user
router.get(
  "/",
  isUsersExist,
  (req, res, next) => {
    next();
  },
  responseMiddleware
);

router.get(
  "/:id",
  isUserExists,
  (req, res, next) => {
    next();
  },
  responseMiddleware
);

router.post(
  "/",
  createUserValid,
  (req, res, next) => {
    res.body = UserService.store(req.body);
    next();
  },
  responseMiddleware
);

router.put(
  "/:id",
  updateUserValid,
  (req, res, next) => {
    const userId = req.params.id;
    const userData = { ...req.body };

    res.body = UserRepository.update(userId, userData);
    next();
  },
  responseMiddleware
);

router.delete(
  "/:id",
  isUserExists,
  (req, res, next) => {
    UserRepository.delete(req.params.id);

    res.body = {
      error: false,
      message: "User deleted successfuly",
    };
    next();
  },
  responseMiddleware
);

module.exports = router;
