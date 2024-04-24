// Fibonacci: o proximo numero da sequencia é sempre a soma dos anteriores
// input: 3
// 0, 1, 1
// input: 5
// 0, 1, 1, 2, 3

const { createSandbox } = require('sinon');
const assert = require('assert')
const Fibonacci = require('./fibonacci');
const sinon = createSandbox()

;(async () => {
    const fibonacci = new Fibonacci()
    
    {
        
        const spy = sinon.spy(
            fibonacci,
            fibonacci.execute.name
        )
        
        // Numero de sequencias: 5
        // [0] input = 5, current = 0, next = 1 = resultado 0
        // [1] input = 4, current = 1, next = 1 = resultado 1
        // [2] input = 3, current = 1, next = 2 = resultado 1
        // [3] input = 2, current = 2, next = 3 = resultado 2
        // [4] input = 1, current = 3, next = 5 = resultado 3
        // [5] input = 0, current = 5, next 8 -> PARA
        
        const results = [...fibonacci.execute(5)]
        const expectedCallCont = 6
        assert.strictEqual(spy.callCount, expectedCallCont)
        //console.log('spy', spy.getCalls())
        
        const {args} = spy.getCall(2)
        const expectedParams = [3, 1, 2]
        assert.deepStrictEqual(args, expectedParams, 'os arrays não são iguais')

        const expectedResults = [0, 1, 1, 2, 3]
        assert.deepStrictEqual(results, expectedResults)

    }
    {
        
        const fibonacci = new Fibonacci()
        const spy = sinon.spy(
            fibonacci,
            fibonacci.execute.name
        )

        // Numero de sequencias: 3
        // [0] input = 5, current = 0, next = 1 = resultado 0
        // [1] input = 4, current = 1, next = 1 = resultado 1
        // [2] input = 3, current = 1, next = 2 = resultado 1
        // [3] input = 2, current = 2, next = 3 -> PARA
        
        
        for(const sequencia of fibonacci.execute(3)){}
        const expectedCallCont = 4
        assert.strictEqual(spy.callCount, expectedCallCont)
        //console.log('spy', spy.getCalls())

        
    }

})()