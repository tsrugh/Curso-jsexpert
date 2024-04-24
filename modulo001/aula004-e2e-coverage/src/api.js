const http = require('http')
const { Http2ServerResponse } = require('http2')
const {once} = require('events')

const DEFAULT_USER ={
    username: 'tsrugh',
    password: '123'
}

const routes = {
    '/contact:get': (request, response) => {
        response.write('contact us page')
        return response.end()
    },
    //curl -i -X POST --data '{"username": "tsrugh", "password": "1243"}'  localhost:3000/login
    //curl -i -X POST --data '{"username": "tsrugh", "password": "123"}'  localhost:3000/login
    '/login:post': async (request, response) => {
        // TEM BO AQUI
        //for await (const data of request){}
        const user = JSON.parse(await once(request, 'data'))
        const toLower = (text) => text.toLowerCase()
        if(toLower(user.username) !== toLower(DEFAULT_USER.username) ||
        user.password !== DEFAULT_USER.password ){
            response.writeHead(401)
            response.end('Log in failed')
            return
        }

        return response.end('Log in succeeded')
    },
    default(request, response ) {
        response.writeHead(404)                          
        return response.end('Not found!')
    }
}


function handler(request, response){
    const {url, method} = request
    const routeKey = `${url.toLowerCase()}:${method.toLowerCase()}`    
    const chosen = routes[routeKey] || routes.default
    return chosen(request, response)
}

const app = http.createServer(handler)
.listen(3000, () => console.log('running at 3000'))

module.exports = app