const ItemSale = require('../models/itemSale.js');

class ItemSaleRepository {
    async create(itemSaleData) {
        try {
            console.log(itemSaleData);
            const itemSale = await ItemSale.create(itemSaleData);
            return itemSale;
        } catch (error) {
            throw new Error(`Error creating item sale: ${error.message}`);
        }
    }

    async findById(id) {
        try {
            const itemSale = await ItemSale.findById(id);
            return itemSale ? itemSale.toJSON() : null;
        } catch (error) {
            throw new Error(`Error finding item sale by ID: ${error.message}`);
        }
    }

    async findBySaleId(saleId) {
        try {
            const itemsSale = await ItemSale.find({ saleId });
            return itemsSale.map(itemSale => itemSale.toJSON());
        } catch (error) {
            throw new Error(`Error finding item sale by Sale ID: ${error.message}`);
        }
    }

    async findAll() {
        try {
            const itemsSale = await ItemSale.find();
            return itemsSale.map(itemSale => itemSale.toJSON());
        } catch (error) {
            throw new Error(`Error finding all item sales: ${error.message}`);
        }
    }

    async update(id, itemSaleData) {
        try {
            const itemSale = await ItemSale.findByIdAndUpdate(id, itemSaleData, { new: true });
            return itemSale ? itemSale.toJSON() : null;
        } catch (error) {
            throw new Error(`Error updating item sale: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            const itemSale = await ItemSale.findByIdAndDelete(id);
            return itemSale ? itemSale.toJSON() : null;
        } catch (error) {
            throw new Error(`Error deleting item sale: ${error.message}`);
        }
    }
}

module.exports = new ItemSaleRepository();
