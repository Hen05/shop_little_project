const mongoose = require('mongoose')

const itemSaleSchema = new mongoose.Schema(
    {
        itemId: { type: String, required: true },
        saleId: { type: String, required: true },
        amount: { type: Number, required: true },
    },
    { timestamps: false }
)

module.exports = mongoose.model('ItemsSale', itemSaleSchema);