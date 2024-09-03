const faker = require('faker')

const Car = require('./../src/entities/car')
const CarCategory = require('./../src/entities/carCategory')
const Customer = require('../src/entities/customer')
const { join } = require('path')
const {writeFile} = require('fs/promises')

const seederBaseFolder = join(__dirname, "../", "database")
const ITEMS_AMOUNT = 2

const cars = []
const customers = []

// generating a random car category
const carCategory = new CarCategory({
    id: faker.random.uuid(),
    name: faker.vehicle.type(),
    carIds: [],
    price: faker.finance.amount(20, 100)
})


// generating cars and customers
for(let i  = 0; i < ITEMS_AMOUNT; i++){

    const car = new Car({
        id: faker.random.uuid(),
        name: faker.vehicle.model(),
        avaliable: true,
        gasAvaliable: true,
        releaseYear: faker.date.past().getFullYear()
    })
    carCategory.carIds.push(car.id)


    const customer = new Customer({
        id: faker.random.uuid(),
        name: faker.name.findName(),
        age: faker.random.number({min: 18, max: 50})
    })

    customers.push(customer)
    cars.push(car)

}

const write = (fileName, data) => writeFile(join(seederBaseFolder, fileName), JSON.stringify(data))

;(async () => {

    await write('cars.json', cars)
    await write('customers.json', customers)
    await write('carsCategory.json', [carCategory])

    console.log('cars: ', cars)
    console.log('cars category: ', carCategory)

})()