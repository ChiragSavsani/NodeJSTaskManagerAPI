const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit, add } = require('../src/math')

test('1 Should calculate total with tip', () => {
    const total = calculateTip(10, .30)

    expect(total).toBe(13)
    // if(total !== 13) {
    //     throw new Error('Total tip should be 13. Got ' + total)
    // }
})

test('2 Should calculate total with default Tip', () => {
    const total = calculateTip(10)
    expect(total).toBe(12.5)
})


test('3 Convert C to F', () => {
    const temp = fahrenheitToCelsius(32)
    expect(temp).toBe(0)
})


test('4 Convert F to C', () => {
    const temp = celsiusToFahrenheit(0)
    expect(temp).toBe(32)
})

// test('Async test demo', (done) => {

//     setTimeout(() => {
//         expect(1).toBe(2)
//         done()
//     }, 2000)
// })

test('5 Promise: Should add 2 numbers', (done) => {
    add(2, 3).then((sum) => {
        expect(sum).toBe(5)
        done()
    })
})

test('6 Should add 2 numbers Async/Await', async () => {
    const sum = await add(10, 20)
    expect(sum).toBe(30)
})


// test('Hello World!', () => {

// })

// test('This should fail', () => {
//     throw new Error('Fail Test case')
// })