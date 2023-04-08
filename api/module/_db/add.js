const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://mhori1020:CRToyZOOzIwcmMdB@home.kx5skji.mongodb.net/?retryWrites=true&w=majority";

async function addData(dbname, collectionName, query) {
    const client = new MongoClient(uri);
    try {
        const database = client.db(dbname);
        const collection = database.collection(collectionName);

        const insertedObj = await collection.insertOne(query)

        console.log(insertedObj);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
const dbname = 'home';
const collectionName = 'users';
const query = { displayId: 'ms', displayName: 'masa' };
addData(dbname, collectionName, query);