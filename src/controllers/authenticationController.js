const AuthService = require('../services/authenticationService.js');
const {getAccessToken} = require("../utils/getAccessToken.js");
const {verifyToken} = require('../middlewares/authenticationMiddleware.js');

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const message = await AuthService.register(username, password);
        res.status(message.status).json({ message: message.message });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Error to register user', error });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const result = await AuthService.login(username, password);

        if (result.success) {
            const isProduction = process.env.NODE_ENV === 'production';

            res.cookie('access_token', result.data, {
                httpOnly: true,
                secure: isProduction,
                maxAge: 24 * 60 * 60 * 1000 * 30,
                sameSite: isProduction ? 'None' : 'Lax',
            });

            return res.status(200).json({ message: 'Login successful' });
        } else {
            return res.status(result.status).json({ message: result.message });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Login error', error: error.message });
    }
};

exports.logout = async (req, res, next) => {
    try {
        const access_token = getAccessToken(req);

        if(!access_token) {
            return res.status(403).json({ message: 'You are not logged in!' });
        }

        res.clearCookie('access_token');

        const result = await AuthService.logout(access_token);
        return res.status(result.status).json({ message: result.message });
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({ message: 'Logout error', error: error.message });
    }
};

exports.getUserInfos = async (req, res, next) => {
    try {
        const access_token = getAccessToken(req);

        const result = await AuthService.getUserInfos(access_token);

        if (result.success) {
            return res.status(200).json(result.data);
        } else {
            return res.status(401).json({ message: result.message });
        }
    } catch (error) {
        console.error('Error during getting user infos:', error);
        res.status(500).json({ message: 'Get user error', error: error.message });
    }
};

exports.isAuthenticated = async (req, res, next) => {
    try{
        return res.status(200).json({ message: 'User is authenticated' });
    } catch (error){
        console.error('Error during isAuthenticated:', error);
        res.status(500).json({ message: 'Authentication failed', error: error.message });
    }
}