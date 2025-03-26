const User = require('../models/user.js');

class UserRepository {
    async create(userData) {
        try {
            const user = await User.create(userData);
            return user.toJSON();
        } catch (error) {
            throw new Error(`Error creating user: ${error.message}`);
        }
    }

    async findById(id) {
        try {
            const user = await User.findById(id);
            return user ? user.toJSON() : null;
        } catch (error) {
            throw new Error(`Error finding user by ID: ${error.message}`);
        }
    }

    async findByUsername(username) {
        try {
            const user = await User.findOne({ username });
            return user ? user.toJSON() : null;
        } catch (error) {
            throw new Error(`Error finding user by username: ${error.message}`);
        }
    }

    async findAll() {
        try {
            const users = await User.find();
            return users.map(user => user.toJSON());
        } catch (error) {
            throw new Error(`Error finding all users: ${error.message}`);
        }
    }

    async update(id, userData) {
        try {
            const user = await User.findByIdAndUpdate(id, userData, { new: true });
            return user ? user.toJSON() : null;
        } catch (error) {
            throw new Error(`Error updating user: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            const user = await User.findByIdAndDelete(id);
            return user ? user.toJSON() : null;
        } catch (error) {
            throw new Error(`Error deleting user: ${error.message}`);
        }
    }
}

module.exports = new UserRepository();
