'use strict'

const Order = use('App/Models/Order')
const Product = use('App/Models/Product')

class OrderController {
  async index ({ request }) {
    const { page, limit, filter = '' } = request.all()
    const query = Order.query()
      .with('customer', (builder) => {
        if (filter) {
          builder.where('name', 'ilike', `%${filter.split(' ').join('%')}%`)
        }
      })
    return query.orderBy('id', 'DESC')
      .paginate(page, limit)
  }

  getData ({ request }) {
    return request.only([
      'customer_id',
      'code'
    ])
  }

  async createItems(record, items) {
    await record.items().delete()
    let total = 0
    if (items && items.length) {
      for (const item of items) {
        const { description, price } = await Product.find(item.product_id)
        let totalItem = (item.price || price) * item.amount
        total += totalItem
        await record.items().create({ description, price, ...item, total: totalItem })
      }
    }
    record.total = total
    record.save()
    return record.items().fetch()
  }

  async store ({ request }) {
    const { items } = request.only('items')
    const record = await Order.create(this.getData({ request }))
    record.load('cliente')
    await this.createItems(record, items)
    return record
  }

  async show ({ params }) {
    const record = await Order.findOrFail(params.id)
    const items = await record.items().with('product').fetch()
    await record.load('customer')
    const order = record.toJSON()
    order.items = items.toJSON()
    return order
  }

  async update ({ params, request }) {
    const record = await Order.findOrFail(params.id)
    const { items } = request.only('items')
    record.merge(this.getData({ request }))
    await this.createItems(record, items)
    await record.save()
    return record
  }

  async destroy ({ params }) {
    const record = await Order.findOrFail(params.id)
    await record.items().delete()
    await record.delete()
  }
}

module.exports = OrderController
