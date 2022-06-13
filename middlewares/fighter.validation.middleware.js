const { fighter } = require("../models/fighter");
const fighterService = require("../services/fighterService");
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

const isFightersExist = (req, res, next) => {
  const fighters = fighterService.getAll();
  if (fighters) {
    res.body = fighters;
    next();
  } else {
    responseWithError(res, "Fighters not found");
  }
};

const isFighterExists = (req, res, next) => {
  const fighter = fighterService.find(req.params.id);

  if (fighter) {
    res.body = fighter;
    next();
  } else {
    responseWithError(res, "Fighter not found");
  }
};

const createFighterValid = (req, res, next) => {
  const data = { ...req.body };
  const messages = [];
  const fighterAttri = Object.keys(fighter).filter((attri) => attri !== "id");

  fighterAttri.map((attri) => {
    data.health = 100;
    if ((message = validator.validate(attri, data, req))) {
      messages.push(message);
    }
  });

  if (
    messages.length === 0 &&
    fighterAttri.length === Object.keys(data).length
  ) {
    next();
  } else {
    responseWithError(
      res,
      "Fighter entity to create is not valid",
      400,
      messages
    );
  }
};

const updateFighterValid = (req, res, next) => {
  const fighter = fighterService.search({ id: req.params.id });

  if (fighter) {
    createFighterValid(req, res, next);
  } else {
    responseWithError(res, "Fighter not found");
  }
};

exports.isFighterExists = isFighterExists;
exports.isFightersExist = isFightersExist;
exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;
