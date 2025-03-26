const userRepository = require('../repositories/userRepository.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const revokedTokenRepository = require('../repositories/revokedTokenRepository.js');
const { Result } = require("../utils/result.js");
const config = require('../../config.js');


exports.register = async (username, password) => {
    const userExistsUsername = await userRepository.findByUsername(username);

    if (userExistsUsername) {
        return Result(false, 409, "User already exists");
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const userData = { username: username, password: passwordHash };
    const user = await userRepository.create(userData);

    return Result(true, 200, "User registered", user);
};

exports.login = async (username, password) => {
    const user = await userRepository.findByUsername(username);

    if (!user) {
        return Result(false, 404, 'User not found');
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
        return Result(false, 422, 'Invalid password');
    }

    const secret = config.JWT_SECRET;
    const token = jwt.sign({ id: user._id }, secret);

    return Result(true, 200, "User authenticated", token);
};

exports.logout = async (token) => {
    await revokedTokenRepository.create({ token });
    return Result(true, 200, 'Logged out successfully', null);
};

exports.getUserInfos = async (access_token) => {
    const result = await this.getUserIdByAcessToken(access_token);
    if (!result.success) {
        return Result(false, 401, message);
    }

    const user = await userRepository.findById(result.data);

    if (!user) {
        return Result(false, 404, 'User not found');
    }

    return Result(true, 200, 'User information retrieved', { username: user.username });
};

exports.getUserIdByAcessToken = async (access_token) => {
    const decoded = jwt.verify(access_token, config.JWT_SECRET);
    return Result(true, 200, 'User id retrieved with success', decoded.id);
};
