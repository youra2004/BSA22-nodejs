const { FighterRepository } = require("../repositories/fighterRepository");

class FighterService {
  // TODO: Implement methods to work with fighters

  search(search) {
    const fighter = FighterRepository.getOne(search);
    if (!fighter) {
      return null;
    }
    return fighter;
  }

  find(id) {
    const fighter = FighterRepository.getOne({ id });

    if (!fighter) {
      return null;
    }
    return fighter;
  }

  store(data) {
    const fighter = FighterRepository.create(data);
    if (fighter) {
      return fighter;
    }
    throw Error("Fighter data is not valid");
  }

  update(data) {
    const fighter = FighterRepository.update(data);
    if (fighter) {
      return fighter;
    }
    return null;
  }

  getAll() {
    const fighters = FighterRepository.getAll();

    if (fighters.length > 0) {
      return fighters;
    }

    return null;
  }
  delete(id) {
    return FighterRepository.delete(id);
  }
}

module.exports = new FighterService();
