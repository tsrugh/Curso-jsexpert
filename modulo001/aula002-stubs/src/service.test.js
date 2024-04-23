const Serrvice = require("./service");
const assert = require('assert');
const { createSandbox } = require('sinon')
const mocks = {
    alderaan: require('../mocks/alderaan.json'),
    tatooine: require('../mocks/tatooine.json')
};

const BASE_URL_1 = 'https://swapi.dev/api/planets/1/'
const BASE_URL_2 = 'https://swapi.dev/api/planets/2/'
const sinon = createSandbox();

; (async () => {

    // Vai para a internet
//     {
//         const service = new Serrvice()
//         const dados = await service.makeRequest(BASE_URL_2)
//         console.log('dados', JSON.stringify(dados))
//     }

    const service = new Serrvice()

    // quando a instancia do Sarvice executar o metodo makeRequest, vai usar o stub ao inves de ir buscar na api
    const stub = sinon.stub(
        service,
        service.makeRequest.name
    )

    // quando bater na url, ele retorna o arquivo do tatooine
    stub
    .withArgs(BASE_URL_1)
    .resolves(mocks.tatooine)

    stub
    .withArgs(BASE_URL_2)
    .resolves(mocks.alderaan)

    {
        const expected = {
            name: 'Tatooine',
            surfaceWter: "1",
            appeardIn: 5
        }

        const results = await service.getPlanets(BASE_URL_1)
        assert.deepStrictEqual(results, expected)

    }
    {
        const expected = {
            name: 'Alderaan',
            surfaceWter: "40",
            appeardIn: 2
        }

        const results = await service.getPlanets(BASE_URL_2)
        assert.deepStrictEqual(results, expected)

    }


})()
