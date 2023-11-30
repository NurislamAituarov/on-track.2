import { instance } from '.'

export const formServices = {
  async sendDataFormAuthorization(data: { email: string; password: string }) {
    return await instance({
      url: '/posts',
      method: 'POST',
      data
    })
  },

  async getUsers() {
    return await instance({
      url: '/users',
      method: 'GET'
    })
  }
}
