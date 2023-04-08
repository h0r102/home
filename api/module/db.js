const { MongoClient } = require("mongodb")
const { DB_NAME } = require('../const/db')

const uri = "mongodb+srv://mhori1020:CRToyZOOzIwcmMdB@home.kx5skji.mongodb.net/?retryWrites=true&w=majority"

async function find(collectionName, json) {
    const client = new MongoClient(uri)
    const database = client.db(DB_NAME)
    const collection = database.collection(collectionName)
    const result = await collection.find(json).toArray()
    // console.log(result)
    client.close()
    return result
}

async function insertOne(collectionName, json) {
    const client = new MongoClient(uri)
    const database = client.db(DB_NAME)
    const collection = database.collection(collectionName)
    const result = await collection.insertOne(json)
    client.close()
    return result
}

async function updateOne(collectionName, findJson, updateJson) {
    const client = new MongoClient(uri)
    const database = client.db(DB_NAME)
    const collection = database.collection(collectionName)
    const result = await collection.updateOne(findJson, { $set: updateJson })
    client.close()
    return result
}

async function deleteOne(collectionName, json) {
    const client = new MongoClient(uri)
    const database = client.db(DB_NAME)
    const collection = database.collection(collectionName)
    const result = await collection.deleteOne(json)
    client.close()
    return result
}

module.exports = {
    find,
    insertOne,
    updateOne,
    deleteOne
}