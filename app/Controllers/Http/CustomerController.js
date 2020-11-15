'use strict'

const Customer = use('App/Models/Customer')
const CrudController = use('App/Utils/CrudController')

class CustomerController extends CrudController {

  async index ({ request }) {
    const { page, limit, filter = '' } = request.all()
    return this.getModel()
      .query()
      .where('name', 'ilike', `%${filter.split(' ').join('%')}%`)
      .orWhere('document', 'ilike', `%${filter.split(' ').join('%')}%`)
      .paginate(page, limit)
  }

  getData ({ request }) {
    return request.only([
      'name',
      'document',
      'phone',
      'address',
      'email'
    ])
  }

  getModel () {
    return Customer
  }

}

module.exports = CustomerController
