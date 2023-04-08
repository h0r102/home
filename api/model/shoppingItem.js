const { json } = require("express")
const { isEqual } = require("../module/util/json")


class ShoppingItem {
    constructor(json, userId, exists = true) {
        this.preJson = json // 更新前のjsonオブジェクト
        this.userId = userId // 実行ユーザID
        this.exists = exists // DBに存在するか

        if (exists) {
            if ('_id' in json) {
                this.id = json._id
            } else {
                throw new Error('There is not "id" in json object')
            }
        }

        if (('updatedBy' in json) && ('updatedAt' in json)) {
            this.updatedBy = json.updatedBy
            this.updatedAt = new Date()
        } else {
            this.updatedBy = userId
            this.updatedAt = this.updatedAt
        }

        if (!('name' in json)) {
            this.changeName('no name')
        } else {
            this.name = json.name
        }

        if (!('quantity' in json)) {
            this.changeQuantity(0)
        } else {
            this.quantity = json.quantity
        }

        if (!('categoryId' in json)) {
            this.changeCategoryId(0)
        } else {
            this.categoryId = json.categoryId
        }

    }

    isUpdated() {
        const curJson = this.getJson()
        return !(isEqual(this.preJson, curJson))
    }

    getJson() {
        if (this.exists) {
            return {
                _id: this.id,
                name: this.name,
                quantity: this.quantity,
                categoryId: this.categoryId,
                updatedBy: this.updatedBy,
                updatedAt: this.updatedAt
            }
        }
        else {
            return {
                name: this.name,
                quantity: this.quantity,
                categoryId: this.categoryId,
                updatedBy: this.updatedBy,
                updatedAt: this.updatedAt
            }
        }
    }

    changeName(name) {
        this.name = name
        this.updatedBy = this.userId
        this.updatedAt = new Date()
    }

    changeQuantity(quantity) {
        this.quantity = quantity
        this.updatedBy = this.userId
        this.updatedAt = new Date()
    }

    changeCategoryId(categoryId) {
        this.categoryId = categoryId
        this.updatedBy = this.userId
        this.updatedAt = new Date()
    }

    change(json) {
        if ('name' in json) {
            this.changeName(json.name)
        }
        if ('quantity' in json) {
            this.changeQuantity(json.quantity)
        }
        if ('categoryId' in json) {
            this.changeCategoryId(json.categoryId)
        }
    }
}

module.exports = ShoppingItem