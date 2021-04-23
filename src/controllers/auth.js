import User from '../entities/user';
import jwt from 'jsonwebtoken';
import logger from '../utils/logger';
const privateKey = process.env.JWT_PRIVATE_KEY

/**
 * Given a json request 
 * {"username": "<...>", "password": "<...>"}
 * Verify the user is valid and return some authentication token
 * which can be used to verify protected resources
 * {"user": <{...}>, "token": "<...>""}
 */
export const login = (req, res) => {
	const  { email, password } = req.body;
	try {
		if (!email || !password) throw 'Invalid Parameters';
		const user = await User.findOne({ email, password });

		if (!user) throw 'Account not found!';
	 
		const token = jwt.sign(user, privateKey, { algorithm: 'RS256'});

		return res.status(200).json({ user, token})
	  } catch (error) {
		return res.status(500).json({ err: error })
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
		const existingUser = await User.findOne({ email: user.email });
		if (existingUser) throw 'Email address already in use';

		const user = await User(body); 
		user.save();

		const token = jwt.sign(user, privateKey, { algorithm: 'RS256'});

		return res.status(200).json({ user, token})
	  } catch (error) {
		return res.status(500).json({ err: error })
	  }
};
/**
 * Implement a way to recover user accounts
 */
export const forgotPassword = (req, res) => {
	const  { email } = req.body;
	try {
		const passwordReset = Math.floor(Math.random() * 100000000).toString();
		const user = await User.findOne({ email });

		if (!user) throw 'Account not found!';

		user.updateOne({ password: passwordReset });

		// implement email notifying user of password reset  

		return res.status(200).json({ success: true, message: 'Your password has been reset' })
	  } catch (error) {
		return res.status(500).json({ err: error })
	  }
};

export default {
	login,
	signup,
	forgotPassword
}