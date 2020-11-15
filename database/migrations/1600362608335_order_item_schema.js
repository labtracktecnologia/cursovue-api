'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderItemSchema extends Schema {
  up () {
    this.create('order_items', (table) => {
      table.increments()
      table.integer('order_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('orders')
      table.integer('product_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('products')
      table.string('description', 120)
      table.decimal('amount', 9, 4)
      table.decimal('price', 9, 4)
      table.decimal('total', 9, 4)
      table.timestamps()
    })
  }

  down () {
    this.drop('order_items')
  }
}

module.exports = OrderItemSchema
