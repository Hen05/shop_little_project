const Item = require('../models/item.js');

class ItemRepository {
    async create(itemData) {
        try {
            const item = await Item.create(itemData);
            return item;
        } catch (error) {
            throw new Error(`Error creating item: ${error.message}`);
        }
    }

    async findById(id) {
        try {
            const item = await Item.findById(id);
            return item ? item.toJSON() : null;
        } catch (error) {
            throw new Error(`Error finding item by ID: ${error.message}`);
        }
    }

    async findAll() {
        try {
            const items = await Item.find({actualPrice: true});
            return items.map(item => item.toJSON());
        } catch (error) {
            throw new Error(`Error finding all items: ${error.message}`);
        }
    }

    async update(id, itemData) {
        try {
            const item = await Item.findByIdAndUpdate(id, itemData, { new: true });
            return item ? item.toJSON() : null;
        } catch (error) {
            throw new Error(`Error updating item: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            const item = await Item.findByIdAndDelete(id);
            return item ? item.toJSON() : null;
        } catch (error) {
            throw new Error(`Error deleting item: ${error.message}`);
        }
    }

    async getTypes(){
        try{
            const uniqueTypes = await Item.distinct('type');
            if (!uniqueTypes) return null;
            return uniqueTypes;
        } catch (error) {
            throw new Error(`Error getting item types: ${error.message}`);
        }
    }
}



module.exports = new ItemRepository();