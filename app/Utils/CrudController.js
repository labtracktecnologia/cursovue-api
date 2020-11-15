'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/**
 * Resourceful controller for interacting with crud objects
 */
class CrudController {
  /**
   * Show a list of all crud objects.
   * GET crud objects
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async index ({ request }) {
    const { page, limit } = request.all()
    return this.getModel().query().paginate(page, limit)
  }

  /**
   * Create/save a new aluno.
   * POST crud objects
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async store ({ request }) {
    return this.getModel().create(this.getData({ request }))
  }

  /**
   * Display a single aluno.
   * GET crud objects/:id
   *
   * @param {object} ctx
   */
  async show ({ params }) {
    const record = await this.getModel().findOrFail(params.id)
    if (this.afterFind) {
      await this.afterFind(record)
    }
    return record
  }

  /**
   * Update aluno details.
   * PUT or PATCH crud objects/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async update ({ params, request }) {
    const record = await this.getModel().findOrFail(params.id)
    record.merge(this.getData({ request }))
    await record.save()
    return record
  }

  /**
   * Delete a aluno with id.
   * DELETE crud objects/:id
   *
   * @param {object} ctx
   */
  async destroy ({ params }) {
    const record = await this.getModel().findOrFail(params.id)
    await record.delete()
  }
}

module.exports = CrudController
