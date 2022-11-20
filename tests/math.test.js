const {calcFunc,farenToCelsius,celsiusToFaren ,add} = require('../src/router/math')


test('Hello World!',()=>{


})


test("EXPECTED SUCCESS" ,()=>{
    const total = calcFunc(10,20);

    expect(total).toBe(30)
})
test("DEFAULT EXPECTED",()=>{
    const total = calcFunc(10);
    expect(total).toBe(20)
})

test("Testing Farenheit",()=>{
    const total1 = farenToCelsius(32);
    expect(total1).toBe(0)
})

test("Testing Celcisus",()=>{
    const total1 = celsiusToFaren(0);
    expect(total1).toBe(32)
})

// test("TESTING ASYNC",async()=>{
//     const data = await add(10,2);
//     expect(data).toBe(12)
// })

test("TESTING ASYNC",async()=>{
    const data = await add(10,20);
    console.log(data)
    expect(data).toBe(30)
})