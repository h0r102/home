const http = require('http')
const fs = require('fs')

const PORT = 3000

http.createServer((request, response) => {
    const method = request.method
    const path = request.url
    console.log(`[request] ${method} ${path}`)

    let requestFile = path.endsWith('/') ? path + 'index.html' : path

    if (path === '/shopping') {
        requestFile = '/shopping.html'
    }

    if (method !== 'GET'
        || !fs.existsSync(`.${requestFile}`)
        || fs.statSync(`.${requestFile}`).isDirectory()
    ) {
        // const requestOptions = {
        //     method: method,
        //     path: path,
        //     headers: request.headers
        // }

        // const shoppingWebAppRequest = http.request(
        //     'http://localhost:8080',
        //     requestOptions
        // )

        // request.on('data', (data) => {
        //     shoppingWebAppRequest.write(data)
        // })

        // shoppingWebAppRequest.on('response', (shoppingWebAppResponse) => {
        //     Object.entries(shoppingWebAppResponse.headers).forEach((header) => {
        //         response.setHeader(header[0], header[1])
        //     })
        //     response.writeHead(shoppingWebAppResponse.statusCode)
        //     shoppingWebAppResponse.on('data', (data) => {
        //         response.write(data)
        //     })
        //     shoppingWebAppResponse.on('end', () => {
        //         response.end()
        //     })
        // })

        // request.on('end', () => {
        //     shoppingWebAppRequest.end()
        // })
        // return
        response.writeHead(404)
        response.end()
        return
    }

    const fileContent = fs.readFileSync(`.${requestFile}`)
    response.writeHead(200)
    response.write(fileContent)
    response.end()

}).listen(PORT, '127.0.0.1')

console.log(`Server started on port ${PORT}`)