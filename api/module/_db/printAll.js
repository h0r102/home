const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://mhori1020:CRToyZOOzIwcmMdB@home.kx5skji.mongodb.net/?retryWrites=true&w=majority";

async function printAll(dbname, collectionName) {
    const client = new MongoClient(uri);
    try {
        const database = client.db(dbname);
        const collection = database.collection(collectionName);
        const array = await collection.find().toArray()
        array.forEach(element => {
            console.log(element)
        });
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
const dbname = 'home';
const collectionName = 'users';
printAll(dbname, collectionName);