function add(v1, v2) {
    return v1 + v2
}

function calculate(v1, v2, callback) {
    return callback(v1, v2)
}

const addResult = calculate(1, 2, add)
console.log(addResult)

setTimeout(() => {
    console.log('hello')
}, 5000)

