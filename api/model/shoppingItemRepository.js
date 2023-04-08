const db = require('../module/db')
const { COLLECTION_NAME_SHOPPING } = require('../const/db')

class ShoppingItemRepository {

    add(name, quantity, categoryId, userId) {
        const doc = {
            'name': name,
            'quantity': quantity,
            'categoryId': categoryId,
            'updatedBy': userId,
            'updatedAt': new Date()
        }
        db.insertOne(COLLECTION_NAME_SHOPPING, doc)
    }
}

module.exports = ShoppingItemRepository