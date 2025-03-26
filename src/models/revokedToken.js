const mongoose = require('mongoose');

const revokedTokenSchema = new mongoose.Schema({
    token: { type: String, required: true },
    revokedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('RevokedTokens', revokedTokenSchema);