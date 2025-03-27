const itemService = require('../services/itemService.js');
const res = require("express/lib/response");

exports.create = async function (req, res) {
    const { image, name, type, price, stock } = req.body;
    const result = await itemService.createItem(image, name, type, price, stock);
    if(!result.success){
        return res.status(result.status).json(result.message)
    }
    return res.status(result.status).send(result.data);
}

exports.getAll = async (req, res) => {
    const result = await itemService.findAllItems();
    if(!result.success){
        return res.status(result.status).send(result.message);
    }
    return res.status(result.status).send(result.data);
}

exports.get = async (req, res) => {
    const { itemId } = req.params;
    const result = await itemService.findItemById(itemId);

    if(!result.success){
        return res.status(result.status).send(result.message);
    }
    return res.status(result.status).send(result.data);
}

exports.update = async (req, res) => {
    const { itemId } = req.params;
    const { name, type, price, stock, actualPrice } = req.body;
    const updateData = {};

    if(name) updateData.name = name;
    if(type) updateData.type = type;
    if(price) updateData.price = price;
    if(stock) updateData.stock = stock;
    if(actualPrice !== null) updateData.actualPrice = actualPrice;

    const result = await itemService.updateItem(itemId, updateData);
    if(!result.success){
        return res.status(result.status).send(result.message);
    }
    return res.status(result.status).send(result.data);
}

exports.delete = async (req, res) => {
    const { itemId } = req.params;
    const result = await itemService.deleteItem(itemId);
    if(!result.success){
        return res.status(result.status).send(result.message);
    }
    return res.status(result.status).send(result.data);
}

exports.getItemTypes = async (req, res) => {
    const result = await itemService.getItemTypes();
    if(!result.success){
        return res.status(result.status).send(result.message);
    }
    return res.status(result.status).send(result.data);
}