const {describe, it, before, beforeEach, afterEach} = require('mocha')
const CarService = require('../../src/service/carService')
const Transaction = require('./../../src/entities/transaction')

const {join} = require('path')
const {expect} = require('chai')
 
const carDatabase = join(__dirname, './../../database', 'cars.json')
const sinon = require('sinon')




const mocks = {
    validCar: require('../mocks/valid-car.json'),
    validCarCategory: require('../mocks/valid-carCategory.json'),
    validCustomer: require('../mocks/valid-customer.json')
}

describe('carService Suite tests', () => {

    let carService = {}
    let sandbox = {}
    before(() => {
        carService = new CarService({
            cars: carDatabase
        })
    })

    beforeEach(() => {
        sandbox = sinon.createSandbox()
    })

    afterEach(() => {
        sandbox.restore()
    })

    it('Should retrive a random position from an array', () => {
        const data = [0, 1, 2, 3, 4]
        const result = carService.getRandomPositionFromArray(data)

        expect(result).to.be.lte(data.length).and.be.gte(0)

    })

    it('Should choose the first id from carsIds in carCategory', () => {

        const carCategory = mocks.validCarCategory
        const carIndex = 0 
        
        sandbox.stub(
            carService,
            carService.getRandomPositionFromArray.name
        ).returns(carIndex)
        


        const result = carService.chooseRandomCar(carCategory)
        const expected = carCategory.carIds[carIndex]


        
        expect(carService.getRandomPositionFromArray.calledOnce).to.be.ok
        expect(result).to.be.equal(expected)

    })

    it('given a carCategory it should return an avaliable car ', async () => {
        
        const car = mocks.validCar
        const carCategory = Object.create(mocks.validCarCategory)
        carCategory.carIds = [car.id]
        
        sandbox.stub(
            carService.carRepository,
            carService.carRepository.find.name
        ).resolves(car)

        sandbox.spy(
            carService,
            carService.chooseRandomCar.name,
        )


        const result = await carService.getAvaliableCar(carCategory)
        const expected = car
        
        expect(carService.chooseRandomCar.calledOnce).to.be.ok
        expect(carService.carRepository.find.calledWithExactly(car.id)).to.be.ok
        expect(result).to.be.deep.equal(expected)
    
    })

    it('Given a carCategory, customer and numberOfDays, it should calculate amount in real', async () => {
        const customer = Object.create(mocks.validCustomer)
        customer.age = 50

        const carCategory = Object.create(mocks.validCarCategory)
        carCategory.price = 37.6

        const numberOfDays = 5

        sandbox.stub(carService, 'taxesBasedOnAge')
        .get(() => [{from: 31, to: 100, then: 1.3 }])

        const expected = carService.currencyFormat.format(244.40)
        const result = carService.calculateFinalPrice(customer, carCategory, numberOfDays)

        expect(result).to.be.deep.equal(expected)

    })

    it('Given a customer and a car, it should return a transaction receipt', async () => {
        const car = mocks.validCar
        const carCategory = {
            ...mocks.validCarCategory,
            price: 37.6,
            carIds: [car.id]
        }
        
        const customer = Object.create(mocks.validCustomer)
        customer.age = 20

        const numberOfDays = 5
        const dueDate = '10 de novembro de 2020'
        const now = new Date(2020, 10, 5)
        sandbox.useFakeTimers(now.getTime())
        sandbox.stub(
            carService.carRepository,
            carService.carRepository.find.name
        ).resolves(car)

        // age: 20; tax: 1.1 categoryPrice: 37.6
        // 37.6 * 1.1 = 41.36 * 5 days =  206.8
        const expectedAmount = carService.currencyFormat.format(206.8)
        const result = await carService.rent(customer, carCategory, numberOfDays)

        const expected = new Transaction({customer, car, dueDate,amount: expectedAmount})
        
        expect(result).to.be.deep.equal(expected)

    })

})