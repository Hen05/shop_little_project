const {getAccessToken} = require("../utils/getAccessToken");
const saleService = require('../services/saleService.js')
const {response} = require("express");
const {Result} = require("../utils/result");

exports.create = async (req, res) => {
    const accessToken = getAccessToken(req);
    const { itemsData, paymentMethod } = req.body;

    const sale = await saleService.createSale(accessToken, paymentMethod);
    if(!sale.success){
        return res.status(sale.status).send(sale.message);
    }

    const result = await saleService.createItemsSale(itemsData, sale.data.id);
    if(!result.success){
        return res.status(result.status).send(result.message);
    }

    return res.status(result.status).send({sale: sale.data, items: result.data});
}

exports.getAll = async (req, res) => {
    const result = await saleService.getAllSales();
    if(!result.success){
        return res.status(result.status).send(result.message);
    }
    return res.status(result.status).send(result.data);
}

exports.getAllSaleInfos = async(req, res) => {
    const result = await saleService.getAllSalesInfos();
    if(!result.success){
        return res.status(result.status).send(result.message);
    }
    return res.status(result.status).send(result.data);
}