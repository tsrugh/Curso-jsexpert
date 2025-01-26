const http = require('http');
const { Http2ServerRequest, Http2ServerResponse } = require('http2');

const routes = {

  '/:get': async (request, response) => {
    response.write(JSON.stringify({

      data: ''

    }))

    return response.end()
  },

  default: (request, response) => {

    response.writeHead(404)
    return response.end(JSON.stringify({message: 'Not Found!'}))

  }

}


function handler(request, response) {

  const { url, method } = request
  const routeKey = `${url.toLowerCase()}:${method.toLowerCase()}`
  const chosen = routes[routeKey] || routes.default
  return chosen(request, response)

}


const app = http.createServer(handler)
.listen(3000, () => console.log('running at 3000'))

module.exports = app