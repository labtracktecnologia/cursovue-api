'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CustomerSchema extends Schema {
  up () {
    this.create('customers', (table) => {
      table.increments()
      table.string('name', 80).notNullable()
      table.string('document', 30)
      table.string('phone', 20)
      table.string('address', 254)
      table.string('email', 254).notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('customers')
  }
}

module.exports = CustomerSchema
