const net = require('net')

const PORT = 3000

net.createServer((socket) => {
    console.log('connected')

    socket.on('data', (data) => {
        console.log(`received: ${data}`)
        socket.write(data)
    })

    socket.on('close', () => {
        console.log('connection closed')
    })
})
    .listen(PORT, '127.0.0.1')

console.log(`Server started on port ${PORT}`)