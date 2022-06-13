const { UserRepository } = require("../repositories/userRepository");

class UserService {
  // TODO: Implement methods to work with user

  search(search) {
    const item = UserRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }

  store(data) {
    if (
      data.email &&
      data.firstName &&
      data.lastName &&
      data.phoneNumber &&
      data.password
    ) {
      return UserRepository.create(data);
    } else {
      return null;
    }
  }

  getAll() {
    const users = UserRepository.getAll();

    if (users.length > 0) {
      return users;
    } else {
      return null;
    }
  }
}

module.exports = new UserService();
