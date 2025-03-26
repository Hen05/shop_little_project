const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema(
    {
        userId: String,
        paymentMethod: String
    },
    {timestamps: true }
);

module.exports = mongoose.model('Sales', SaleSchema);
