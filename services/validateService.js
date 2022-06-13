const {
  EMAIL_VALIDATION_RULE,
  PHONE_VALIDATION_RULE,
} = require("../constants/validation");
const userService = require("../services/userService");
const fighterService = require("../services/fighterService");

class ValidationService {
  validate(fieldName, data, req = null) {
    // console.log(data[fieldName]);
    if (data[fieldName] && data[fieldName].length !== 0) {
      const value = data[fieldName];
      let user;
      switch (fieldName) {
        case "email":
          if (!this.regexValidation(value, EMAIL_VALIDATION_RULE)) {
            return this.generateMessage(
              fieldName,
              "The field must be a valid email address (@gmail.com)"
            );
          }

          user = userService.search({ email: value });
          if (req && !this.onExistsValid(user, req)) {
            return this.generateMessage(
              fieldName,
              `The ${fieldName} already exist`
            );
          }

          break;
        case "phoneNumber":
          if (!this.regexValidation(value, PHONE_VALIDATION_RULE)) {
            return this.generateMessage(
              fieldName,
              "The field must be a valid phone number (+380xxxxxxxxx)"
            );
          }

          user = userService.search({ phoneNumber: value });
          if (req && !this.onExistsValid(user, req)) {
            return this.generateMessage(
              fieldName,
              `The ${fieldName} already exist`
            );
          }
          break;
        case "password":
          if (value.length < 3) {
            return this.generateMessage(
              fieldName,
              "The field must be longer than 3 digits"
            );
          }

          if (!this.checkPasswordStrength(value)) {
            return this.generateMessage(
              fieldName,
              "The password is not strength enough"
            );
          }
          break;
        case "name":
          const fighter = fighterService.search({ name: value });
          if (!this.onExistsValid(fighter, req)) {
            return this.generateMessage(fieldName, "The name is exists");
          }
          break;
        case "power":
          if (value > 100) {
            return this.generateMessage(
              fieldName,
              "The power cannot be more than 100"
            );
          }

          if (!Number.isInteger(value)) {
            return this.generateMessage(
              fieldName,
              "The power field must be an integer"
            );
          }

          if (value <= 0) {
            return this.generateMessage(
              fieldName,
              "The power field must be more that 0"
            );
          }
          break;
        case "defense":
          if (!Number.isInteger(value)) {
            return this.generateMessage(
              fieldName,
              "The defense field must be an integer"
            );
          }

          if (value > 10) {
            return this.generateMessage(
              fieldName,
              "The defense cannot be more than 10"
            );
          }

          if (value < 1) {
            return this.generateMessage(
              fieldName,
              "The power field must be more than 0"
            );
          }
          break;
        default: {
          return false;
        }
      }
    } else {
      return this.generateMessage(fieldName);
    }
  }

  regexValidation(value, rule) {
    const re = new RegExp(rule);
    return re.test(value);
  }

  checkPasswordStrength(password) {
    let strength = 0;
    if (password.match(/[0-9]+/)) {
      strength += 1;
    }
    if (password.match(/[a-z]+/)) {
      strength += 1;
    }
    if (password.match(/[A-Z]+/)) {
      strength += 1;
    }
    if (password.match(/[$@#&!]+/)) {
      strength += 1;
    }

    if (strength < 3) {
      return false;
    }

    return true;
  }

  generateMessage(fieldName, errorMessage = "The field is required") {
    return { [fieldName]: errorMessage };
  }

  onExistsValid(model, req) {
    if (model) {
      if (req.method === "PUT") {
        if (model.id === req.params.id) {
          return true;
        }
      }
      return false;
    }

    return true;
  }
}

module.exports = new ValidationService();
