export function useRequestsService() {
  const { $api } = useNuxtApp()

  return {
    async getRequests() {
      const response = await $api.get('/requests')
      return response.data
    },

    async updateStatus(id, status) {
      const response = await $api.patch('/requests/' + id, { status })
      return response.data
    }
  }
}
