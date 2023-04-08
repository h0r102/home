const db = require('./db')
const { ObjectId } = require('mongodb')
const ShoppingItem = require('../model/shoppingItem')

async function findShoppingItems(json) {
    const result = await db.find('shoppingItems', json)
    return result
}

async function insertShoppingItem(json) {
    const userId = 0
    let result = {}
    let shoppingItem = new ShoppingItem(json, userId, false)
    result = db.insertOne('shoppingItems', shoppingItem.getJson())
    return result
}

async function updateShoppingItem(findJson, updateJson) {
    const userId = 0
    let result = {}
    const data = await db.find('shoppingItems', findJson)
    if (data.length === 0) {
        console.log(`Search result is not unique. length=${data.length}`)
    }
    else if (data.length === 1) {
        let shoppingItem = new ShoppingItem(data[0], userId)
        shoppingItem.change(updateJson)
        result = db.updateOne('shoppingItems', findJson, shoppingItem.getJson())
    } else {
        console.log('No one found')
    }
    return result
}

async function deleteShoppingItem(json) {
    let result = {}
    const data = await db.find('shoppingItems', json)
    if (data.length === 0) {
        console.log(`Search result is not unique. length=${data.length}`)
    }
    else if (data.length === 1) {
        result = db.deleteOne('shoppingItems', json)
    } else {
        console.log('No one found')
    }
    return result
}

async function deleteShoppingItemsById(ids) {
    await ids.forEach(async (id) => {
        const json = { _id: new ObjectId(id) }
        await deleteShoppingItem(json)
    });
}

module.exports = {
    findShoppingItems,
    insertShoppingItem,
    updateShoppingItem,
    deleteShoppingItem,
    deleteShoppingItemsById
}