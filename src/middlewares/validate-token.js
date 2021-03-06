const jwt = require("jsonwebtoken");
import { JWT_PRIVATE_KEY } from '../config/';
const privateKey = JWT_PRIVATE_KEY;

exports.validateToken = (req, res, next) => {
  const authorizationHeaader = req.headers.authorization;
  let result;
  if (authorizationHeaader) {
    const token = req.headers.authorization.split(" ")[1]; // Bearer <token>
    const secret = privateKey;
    try {
      // verify makes sure that the token hasn't expired and has been issued by us
      result = jwt.verify(token, secret);
 
      req.user = result._doc;
      // We call next to pass execution to the subsequent middleware
      next();
    } catch (error) {
      // Throw an error just in case anything goes wrong with verification
      result = {
        error,
        status: 401,
      };
      res.status(401).send(result); 
    }
  } else {
    result = {
      error: `Authentication error. Token required.`,
      status: 401,
    };
    res.status(401).send(result);
  }
};
