const itemRepository = require('../repositories/itemRepository.js');
const {Result} = require("../utils/result");

exports.createItem = async (image, name, type, price, stock) => {
    const itemData = {
        image,
        name,
        type,
        price,
        stock,
        actualPrice: true
    }
    const item = await itemRepository.create(itemData);
    return Result(true, 200, 'Item created with success', item)
}

exports.findItemById = async (id) => {
    const item = await itemRepository.findById(id);
    if (!item) {
        return Result(false, 404, 'Item not found');
    }
    return Result(true, 200, 'Item found', item)
}

exports.findAllItems = async () => {
    const items = await itemRepository.findAll();
    if(!items) {
        return Result(false, 404, 'Database without items');
    }
    return Result(true, 200, 'Item found', items);
}

exports.updateItem = async (id, itemNewData) => {
    const itemDb = await itemRepository.findById(id);
    if(!itemDb){
        return Result(false, 404, 'Item not found');
    }

    const updatedItem = await itemRepository.update(id, itemNewData);
    if(!updatedItem) {
        return Result(false, 404, 'Item not found');
    }

    return Result(true, 200, 'Item updated', updatedItem)
}

exports.deleteItem = async (id) => {
    const itemDelete = await itemRepository.delete(id);
    if(!itemDelete) {
        return Result(false, 404, 'Item not found');
    }

    return Result(true, 200, 'Item deleted');
}

exports.getItemTypes = async () => {
    const types = await itemRepository.getTypes();
    if(!types) {
        return Result(false, 404, 'Database without items');
    }
    return Result(true, 200, 'Item types found', types);
}