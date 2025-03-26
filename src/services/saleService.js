const authService = require('../services/authenticationService.js');
const userRepository = require('../repositories/userRepository.js');
const saleRepository = require('../repositories/saleRepository.js');
const itemSaleRepository = require('../repositories/itemSaleRepository.js');
const itemRepository = require('../repositories/itemRepository.js');
const {Result} = require("../utils/result");

exports.createSale = async (access_token, paymentMethod) => {
    const resultId = await authService.getUserIdByAcessToken(access_token);
    if(!resultId.success){
        return Result(false, 401, 'User does not exist');
    }

    const userId = resultId.data;

    const user = await userRepository.findById(userId);
    if (!user) {
        return Result(false, 401, "User not found");
    }

    const saleData = {userId: userId, paymentMethod: paymentMethod};
    const sale = await saleRepository.create(saleData);

    return Result(true, 200, 'Sale created', sale);
}

exports.createItemsSale = async (itemsData, saleId) => {
    const items = [];
    for(const itemData of itemsData) {
        const item = await itemRepository.findById(itemData.itemId);
        if (!item) {
            await saleRepository.delete(saleId);
            return Result(false, 401, "Item not found");
        }

        if (itemData.quantity > item.stock){
            const itemsInSale = await itemSaleRepository.findById(saleId);
            for (const item in itemsInSale) {
                await itemRepository.delete(item.itemId);
            }
            await saleRepository.delete(saleId);
            return Result(false, 401, "Trying to buy more items than stock");
        }

        const itemSaleData = {
            itemId: itemData.itemId,
            saleId: saleId,
            amount: itemData.quantity
        }

        await itemRepository.update(item._id, {stock: item.stock - itemSaleData.amount});

        const itemSale = await itemSaleRepository.create(itemSaleData);
        items.push(itemSale);
    }
    return Result(true, 200, 'Items-Sale created with success', );
}

exports.getSale = async (id) => {
    const sale = await saleRepository.findById(id);
    if(!sale) {
        return Result(false, 404, 'Sale not found');
    }

    return Result(true, 200, 'Sale found', sale);
}

exports.getAllSales = async () => {
    const sales = await saleRepository.findAll();
    if(!sales) {
        return Result(false, 404, 'Sale not found');
    }

    return Result(true, 200, 'Sales found', sales);
}

exports.getSaleValue = async (saleId) => {
    const sale = await saleRepository.findById(saleId);
    if(!sale) {
        return Result(false, 404, 'Sale not found');
    }

    const itemsSale = await itemSaleRepository.findBySaleId(saleId);
    if(!itemsSale) {
        return Result(false, 404, 'Item-Sale not found');
    }

    let value = 0;
    for(const itemSale of itemsSale) {
        const item = await itemRepository.findById(itemSale.saleId);
        if(!item) {
            return Result(false, 404, 'Item not found');
        }
        value += item.price;
    }

    return Result(true, 200, 'Sale created', value);
}

exports.getItemsSale = async (saleId) => {
    const sale = await saleRepository.findById(saleId);
    if(!sale) {
        return Result(false, 404, 'Sale not found');
    }

    const itemsSale = await itemSaleRepository.findBySaleId(saleId);
    if(!itemsSale) {
        return Result(false, 404, 'Item-Sale not found');
    }

    const items = [];
    for(const itemSale of itemsSale) {
        const item = await itemRepository.findById(itemSale.saleId);
        if(!item) {
            return Result(false, 404, 'Item not found');
        }
        items.push(item);
    }

    return Result(true, 200, 'Sale created', items);
}

exports.getAllSalesInfos = async () => {
    const sales = await saleRepository.findAll();
    if(!sales) {
        return Result(false, 404, 'Sales not found');
    }

    const saleResponse = [];

    for(const sale of sales){
        const items = [];
        const user = await userRepository.findById(sale.userId);
        const itemsSales = await itemSaleRepository.findBySaleId(sale._id);
        for(const itemSale of itemsSales) {
            const item = await itemRepository.findById(itemSale.itemId);
            if(!item) {
                return Result(false, 404, "Something wrong with the sales")
            }
            items.push({item, amount: itemSale.amount});
        }
        const data = {
            saleId: sale._id,
            date: sale.createdAt,
            paymentMethod: sale.paymentMethod,
            user,
            items
        }
        saleResponse.push(data);
    }

    return Result(true, 200, "Successefull", saleResponse)
}