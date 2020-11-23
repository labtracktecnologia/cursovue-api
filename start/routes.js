'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { msg: 'Está vivo!!!' }
})

Route.post('/login', 'SessionController.login')
Route.post('/register', 'SessionController.register')
Route.get('/@me', 'SessionController.me')
Route.put('/@me', 'SessionController.updateProfile')
Route.put('/@me/password', 'SessionController.changePassword')

Route.resource('customers', 'CustomerController').middleware(['auth:jwt'])
Route.resource('products', 'ProductController').middleware(['auth:jwt'])
Route.resource('orders', 'OrderController').middleware(['auth:jwt'])
