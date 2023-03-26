const http = require('http')
const uid = require('uid-safe').sync

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

http.createServer((request, response) => {
    const method = request.method
    const path = request.url
    console.log(`[request] ${path}`)
    Object.entries(request.headers).forEach((header) => {
        console.log(header)
    })

    if (path === '/shopping' && method === 'GET') {
        response.writeHead(200)
        const responseBody = getShoppingHTML()
        response.write(responseBody)
        response.end()
        return
    } else if (path === '/shopping' && method === 'POST') {
        let requestBody = ''
        request.on('data', (data) => {
            requestBody += data
        })

        request.on('end', () => {
            const name = requestBody.split('=')[1]

            const shoppingItem = {
                name: name,
                createdAt: new Date()
            }

            shoppingList.push(shoppingItem)

            response.writeHead(303, {
                location: '/shopping'
            })
            response.end()
        })
        return
    } else if (path === '/api/shopping' && method === 'GET') {
        response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
        response.writeHead(200)
        const responseBodyJson = {
            shoppingList: shoppingList
        }
        const responseBody = JSON.stringify(responseBodyJson)
        response.write(responseBody)
        response.end()
        return
    } else if (path === '/api/shopping' && method === 'POST') {
        let requestBody = ''
        request.on('data', (data) => {
            requestBody += data
        })

        request.on('end', () => {
            const requestBodyJson = JSON.parse(requestBody)
            const name = requestBodyJson.name

            if (!name || name.length < 1 || 30 < name.length) {
                response.writeHead(400)
                response.end()
                return
            }

            const shoppingItem = {
                name: requestBodyJson.name,
                createdAt: new Date()
            }

            shoppingList.push(shoppingItem)

            response.writeHead(201)
            response.end()
        })
        return
    } else if (path === '/set-cookie-sample' && method === 'GET') {
        response.setHeader('Set-Cookie', 'name=alice')
        response.writeHead(200)
        response.write('set cookie sample')
        response.end()
        return
    } else if (path === '/session-start' && method === 'GET') {
        const userId = 2

        const sessionId = uid(24)

        sessions[sessionId] = {
            userId: userId
        }

        response.setHeader('Set-Cookie', `sid=${sessionId}`)
        response.writeHead(200)
        response.write('session started')
        response.end()
        return
    } else if (path === '/me' && method === 'GET') {
        const cookie = request.headers.cookie
        const sessionId = cookie.split('=')[1]

        const userId = sessions[sessionId].userId

        const user = users.find((user) => {
            return user.id === userId
        })

        response.writeHead(200)
        response.write(`userId: ${userId}, userName: ${user.name}`)
        response.end()
        return
    }

    response.writeHead(404)
    response.end()
    return

}).listen(PORT, '127.0.0.1')

console.log(`Server started on port ${PORT}`)