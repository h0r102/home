const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://mhori1020:CRToyZOOzIwcmMdB@home.kx5skji.mongodb.net/?retryWrites=true&w=majority";

async function printData(dbname, collectionName, query) {
    const client = new MongoClient(uri);
    try {
        const database = client.db(dbname);
        const collection = database.collection(collectionName);

        const one = await collection.findOne(query);

        console.log(one);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

const dbname = 'sample_mflix';
const collectionName = 'movies';
const query = { title: 'Back to the Future' };
printData(dbname, collectionName, query);