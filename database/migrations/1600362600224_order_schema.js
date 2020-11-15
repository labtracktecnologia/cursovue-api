'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderSchema extends Schema {
  up () {
    this.create('orders', (table) => {
      table.increments()
      table.string('code', 20).notNullable().unique()
      table.integer('customer_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('customers')
      table.decimal('total', 9, 4)
      table.timestamps()
    })
  }

  down () {
    this.drop('orders')
  }
}

module.exports = OrderSchema
