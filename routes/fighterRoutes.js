const { Router } = require("express");
const FighterService = require("../services/fighterService");
const { responseMiddleware } = require("../middlewares/response.middleware");
const {
  createFighterValid,
  updateFighterValid,
  isFightersExist,
  isFighterExists,
} = require("../middlewares/fighter.validation.middleware");

const router = Router();

// TODO: Implement route controllers for fighter

router.get(
  "/",
  isFightersExist,
  (req, res, next) => {
    next();
  },
  responseMiddleware
);

router.get(
  "/:id",
  isFighterExists,
  (req, res, next) => {
    next();
  },
  responseMiddleware
);

router.post(
  "/",
  createFighterValid,
  (req, res, next) => {
    res.body = FighterService.store(req.body);
    next();
  },
  responseMiddleware
);

router.put(
  "/:id",
  updateFighterValid,
  (req, res, next) => {
    const fighterId = req.params.id;
    const fighterData = { ...req.body };

    res.body = FighterService.update(fighterId, fighterData);
    next();
  },
  responseMiddleware
);

router.delete(
  "/:id",
  isFighterExists,
  (req, res, next) => {
    FighterService.delete(req.params.id);

    res.body = {
      error: false,
      message: "Fighter deleted successfuly",
    };
    next();
  },
  responseMiddleware
);

module.exports = router;
