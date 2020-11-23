'use strict'

const User = use('App/Models/User')

class SessionController {

  async login ({ request, auth, response }) {

    const { email, password } = request.all()
    try {
      // validate the user credentials and generate a JWT token
      const token = await auth.attempt(
        email,
        password
      )

      return response.json({
        status: 'success',
        data: token
      })
    } catch (error) {
      response.status(400).json({
        status: 'error',
        message: 'E-mail/senha incorretos'
      })
    }
  }

  async register ({ request, response }) {
    try {
      const { name, phone, email, password } = request.all()
      const user = await User.create({ name, phone, email, password })
      return response.json({
        status: 'success',
        data: user
      })
    } catch (err) {
      return response.status(400).json({
        status: 'error',
        message: 'Problemas ao criar o usuário, verifique os detalhes.',
        details: err.message
      })
    }
  }

  async me ({ auth, response, request }) {

    const user = await auth.getUser()

    return response.json({
      status: 'success',
      data: user,
      extras: {
        origin: `${request.protocol()}://${request.hostname()}${request.originalUrl()}`,
        url: request.url()
      }
    })
  }

  async updateProfile ({ request, auth, response }) {

    try {
      // get currently authenticated user
    const user = await auth.getUser()

      // update with new data entered
      const data = request.only(['name', 'phone'])
      user.merge(data)
      await user.save()

      return response.json({
        status: 'success',
        message: 'Perfil atualizado!',
        data: user
      })
    } catch (error) {
      return response.status(400).json({
        status: 'error',
        message: 'Problemas ao atualizar o perfil, tente novamente mais tarde.'
      })
    }
  }

  async changePassword({ auth, request, response }) {

    const { password, newPassword, repeatPassword } = request.all()
    const user = await auth.getUser()
    try {
      await auth.attempt(user.email, password)
      if (newPassword !== repeatPassword) {
        return response.status(400).json({
          status: 'error',
          message: 'Nova senha e repetição não são identicas!'
        })
      }
      await user.merge({ password: newPassword })
      return response.json({
        status: 'success',
        message: 'Senha atualizada!'
      })
    } catch (error) {
      return response.status(400).json({
        status: 'error',
        message: 'Senha atual não confere!'
      })
    }
  }
}

module.exports = SessionController
