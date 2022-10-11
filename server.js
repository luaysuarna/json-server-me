const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)

// append the data
// any request to post
// server.use((req, res, next) => {
//   if (req.method === 'POST') {
//     req.body.createdAt = Date.now()
//   }

//   res.cookie('uuid', '1', { signed: true, httpOnly: false })

//   // Continue to JSON Server router
//   next()
// })


// Add this before server.use(router)
// custom routes
server.use(jsonServer.rewriter({
  // NPP for QBO Testing Purpose
  // '/public/api/v1/accounts/*': '/$1'
  "/api/user/change_password": "/user/1",
  "/api/qbo/validate": "/npp_qbo_user_validate_respose"
}))

// custom response
// router.render = (req, res) => {
  // the response will be inside
  // body
  // eg: {
  //   body: response
  // }
  // res.jsonp({
  //   body: res.locals.data
  // })

  // will response error
  // return res.status(200).jsonp({
  //   errors: ["error message here"]
  // })
// }

// Use default router
server.use(router)

server.listen(3001, () => {
  console.log('JSON Server is running on Port: 3001')
})