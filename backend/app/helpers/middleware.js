const authJWT = require("../middleware/auth");
const verify = require("../middleware/verify");

module.exports = {
  authJWT,
  verify
};