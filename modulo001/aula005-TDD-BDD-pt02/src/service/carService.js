const BaseRepository = require('./../repository/base/baseRepository')

class CarService {

    constructor({cars}) {
        this.carRepository = new BaseRepository({file: cars})
    }

    getRandomPositionFromArray(list) {
        const listLength = list.length
        return Math.floor(
            Math.random() * (listLength)
        )
    }

    chooseRandomCar(carCategory) {
        
        const randomIndex = this.getRandomPositionFromArray(carCategory.carIds)
        const carId = carCategory.carIds[randomIndex]

        return carId

    }

    async getAvaliableCar(carCategory){

        const carId = this.chooseRandomCar(carCategory)
        const car = await this.carRepository.find(carId)

        return car
    }

}


module.exports = CarService