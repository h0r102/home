const express = require('express')
const router = express.Router()
const shoppingDB = require('../module/shopping.js')

// console.log(process.env.ALLOW_ORIGIN)

const asyncWrapper = fn => {
    return (req, res, next) => {
        return fn(req, res, next).catch(next);
    }
};

router.get('/shopping', asyncWrapper(async (req, res, next) => {
    let shoppingList = {}
    try {
        shoppingList = await shoppingDB.findShoppingItems(req.body)
        console.log(`Find ShoppingList succeed. data=${JSON.stringify(req.body)}`)
    } catch (e) {
        res.status(400).send(`Get ShoppingList failed. data=${JSON.stringify(req.body)}, ${e.message}`)
    }
    res.status(201).send(shoppingList)
}))

router.post('/shopping/:id/update', asyncWrapper(async (req, res, next) => {
    try {
        await shoppingDB.updateShoppingItem(req.body)
        console.log(`Update ShoppingItem succeed. data=${JSON.stringify(req.body)}`)
    } catch (e) {
        res.status(400).send(`Update ShoppingItem failed. data=${JSON.stringify(req.body)}, ${e.message}`)
    }
    res.status(301).redirect('/shopping')
}))

router.post('/shopping/add', asyncWrapper(async (req, res, next) => {
    try {
        console.log(req)
        console.log(req.body)
        console.log(req.body.name)
        await shoppingDB.insertShoppingItem(req.body)
        console.log(`Add ShoppingItem succeed. data=${req}`)
        console.log(`Add ShoppingItem succeed. data=${JSON.stringify(req.body)}`)
    } catch (e) {
        res.status(400).send(`Add ShoppingItem failed. data=${JSON.stringify(req.body)}, error=${e.message}`)
    }
    res.status(301).redirect('/shopping')
}))

router.post('/shopping/:id/delete', asyncWrapper(async (req, res, next) => {
    try {
        await shoppingDB.deleteShoppingItem(req.body)
        console.log(`Delete ShoppingItem succeed. data=${JSON.stringify(req.body)}`)
    } catch (e) {
        res.status(400).send(`Delete ShoppingItem failed. data=${JSON.stringify(req.body)}, err=${e.message}`)
    }
    res.status(301).redirect('/shopping')
}))

router.post('/shopping/delete', asyncWrapper(async (req, res, next) => {
    try {
        await shoppingDB.deleteShoppingItemsById(req.body.ids)
        console.log(`Delete ShoppingItems by Id succeed. data=${JSON.stringify(req.body)}`)
    } catch (e) {
        res.status(400).send(`Delete ShoppingItem failed. data=${JSON.stringify(req.body)}, err=${e.message}`)
    }
    res.status(301).redirect('/shopping')
}))

module.exports = router