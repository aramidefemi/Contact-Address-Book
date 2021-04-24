import User from '../entities/user';
import jwt from 'jsonwebtoken';
import logger from '../utils/logger';
import { JWT_PRIVATE_KEY } from '../config/';
const privateKey = JWT_PRIVATE_KEY;

/**
 * Given a json request
 * {"username": "<...>", "password": "<...>"}
 * Verify the user is valid and return some authentication token
 * which can be used to verify protected resources
 * {"user": <{...}>, "token": "<...>""}
 */
export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) throw new Error('Invalid Parameters');
    const user = await User.findOne({ username });

    if (!user) throw new Error('Account not found!');

    const token = jwt.sign({...user}, privateKey);

    return res.status(200).json({ user, token });
  } catch (error) {
	logger.error(error)
    return res.status(500).json({ err: error.message });
  }
};
/**
 * Given a json request
 * {"username": "<...>", "password": "<...>"}
 * Create a new user and return some authentication token
 * which can be used to verify protected resources
 * {"user": <{...}>, "token": "<...>""}
 */
export const signup = async (req, res) => {
  const { body } = req;

  try {
    if (!body.email || !body.password || !body.username)
	  throw new Error('Invalid Parameters');
	  
    const existingUser = await User.findOne({ email: body.email });
	if (existingUser) throw new Error('Email address already in use');
	
    const user = new User(body);
	user.save();
	
	const token = jwt.sign({ ...user }, privateKey);
	
    return res.status(200).json({ user, token });
  } catch (error) {
	logger.error(error)
    return res.status(500).json({ err: error.message });
  }
};
/**
 * Implement a way to recover user accounts
 */
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const passwordReset = Math.floor(Math.random() * 100000000).toString();
    const user = await User.findOne({ email });

    if (!user) throw new Error('Account not found!');

    user.updateOne({ password: passwordReset });

    // implement email notifying user of password reset

    return res
      .status(200)
      .json({ success: true, message: 'Your password has been reset' });
  } catch (error) {
	logger.error(error)
    return res.status(500).json({ err: error.message });
  }
};

export default {
  login,
  signup,
  forgotPassword,
};
