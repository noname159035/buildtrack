import axios from 'axios'

export default defineNuxtPlugin(() => {
  const api = axios.create({
    baseURL: '/api',
    timeout: 10000
  })

  api.interceptors.response.use(
    response => response,
    error => {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Не удалось выполнить запрос'

      return Promise.reject(new Error(message))
    }
  )

  return {
    provide: {
      api
    }
  }
})
