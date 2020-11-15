'use strict'

const Product = use('App/Models/Product')
const CrudController = use('App/Utils/CrudController')

class CustomerController extends CrudController {

  async index ({ request }) {
    const { page, limit, filter = '' } = request.all()
    return this.getModel()
      .query()
      .where('code', 'ilike', `%${filter.split(' ').join('%')}%`)
      .orWhere('description', 'ilike', `%${filter.split(' ').join('%')}%`)
      .paginate(page, limit)
  }

  getData ({ request }) {
    return request.only([
      'code',
      'description',
      'price',
      'stock'
    ])
  }

  getModel () {
    return Product
  }

}

module.exports = CustomerController
