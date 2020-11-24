'use strict'

const Helpers = use('Helpers')

class UserController {
  async imageShow({ params, response }) {
    response.download(Helpers.tmpPath(`uploads/users/${params.path}`))
  }
}

module.exports = UserController
