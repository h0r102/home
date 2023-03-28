const express = require('express')
const uid = require('uid-safe').sync
const app = express();

const PORT = 8080

const sessions = {}

const users = [
    {
        id: 1,
        name: 'alice'
    },
    {
        id: 2,
        name: 'bob'
    }
]

const shoppingList = [
    {
        name: "牛乳",
        createdAt: new Date()
    },
    {
        name: "納豆",
        createdAt: new Date()
    }
]

function getShoppingHTML() {
    const shoppingListHTMLElement = shoppingList
        .map((shoppingList) => {
            return `
            <tr>
                <td>${shoppingList.name}</td>
                <td>${shoppingList.createdAt}</td>
            </tr>
            `
        })

    return `<!DOCTYPE html>
    <html lang="ja">
    <head>
        <meta charset="utf-8" />
        <title>shopping</title>
    </head>
    
    <body>
        <h1>買い物リスト</h1>
        <a href="/shopping/new.html">アイテム追加</a>
        <table>
            <thead>
                <tr>
                    <th>項目名</th>
                    <th>作成日時</th>
                </tr>
            </thead>
            <tbody>
            ${shoppingListHTMLElement}
            </tbody>
        </table>
        <a href="/hello.html">helloへ</a>
    </body>
    </html>
    `
}

app.get('/shopping', (req, res) => {
    const responseBody = getShoppingHTML()
    res.header('Access-Control-Allow-Origin', '*')
    res.status(200).send(responseBody)
});

app.post('/shopping', (req, res) => {
    let requestBody = ''
    req.on('data', (data) => {
        requestBody += data
    })

    req.on('end', () => {
        const name = requestBody.split('=')[1]

        const shoppingItem = {
            name: name,
            createdAt: new Date()
        }

        shoppingList.push(shoppingItem)

        res.header('Access-Control-Allow-Origin', '*')
        res.redirect('/shopping')
    })
})

app.get('/api/shopping', (req, res) => {
    const responseBodyJson = {
        shoppingList: shoppingList
    }
    const responseBody = JSON.stringify(responseBodyJson)

    res.header('Access-Control-Allow-Origin', '*')
    res.status(200).send(responseBody)
})

app.post('/api/shopping', (req, res) => {
    let requestBody = ''
    req.on('data', (data) => {
        requestBody += data
    })

    req.on('end', () => {
        const requestBodyJson = JSON.parse(requestBody)
        const name = requestBodyJson.name

        if (!name || name.length < 1 || 30 < name.length) {
            res.status(400).send()
            return
        }

        const shoppingItem = {
            name: requestBodyJson.name,
            createdAt: new Date()
        }

        shoppingList.push(shoppingItem)

        res.header('Access-Control-Allow-Origin', '*')
        res.status(201).send()
    })
})

app.use((req, res) => {
    res.status(404).send()
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})