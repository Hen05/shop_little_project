const Sale = require('../models/sale.js');

class SaleRepository {
    async create(saleData) {
        try {
            const sale = await Sale.create(saleData);
            return sale;
        } catch (error) {
            throw new Error(`Error creating sale: ${error.message}`);
        }
    }

    async findById(id) {
        try {
            const sale = await Sale.findById(id);
            return sale ? sale.toJSON() : null;
        } catch (error) {
            throw new Error(`Error finding sale by ID: ${error.message}`);
        }
    }

    async findAll() {
        try {
            const sales = await Sale.find();
            return sales.map(sale => sale.toJSON());
        } catch (error) {
            throw new Error(`Error finding all sales: ${error.message}`);
        }
    }

    async update(id, saleData) {
        try {
            const sale = await Sale.findByIdAndUpdate(id, saleData, { new: true });
            return sale ? sale.toJSON() : null;
        } catch (error) {
            throw new Error(`Error updating sale: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            const sale = await Sale.findByIdAndDelete(id);
            return sale ? sale.toJSON() : null;
        } catch (error) {
            throw new Error(`Error deleting sale: ${error.message}`);
        }
    }
}

module.exports = new SaleRepository();