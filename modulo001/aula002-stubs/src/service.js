class Serrvice {

    async makeRequest(url) {
        return (await fetch(url)).json()
    }

    async getPlanets(url) {
        const data = await this.makeRequest(url)

        return {
            name: data.name,
            surfaceWter: data.surface_water,
            appeardIn: data.films.length
        }

    }

}

module.exports = Serrvice