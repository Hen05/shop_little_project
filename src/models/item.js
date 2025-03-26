const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema(
    {
        image: { type: String, required: true },
        name: { type: String, required: true },
        type: { type: String, required: true },
        price: { type: Number, required: true },
        stock: { type: Number, required: true },
        actualPrice: { type: Boolean, required: true, default: true },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Items', itemSchema);
