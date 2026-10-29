export function useProjectsService() {
  const { $api } = useNuxtApp()

  return {
    async getProjects(params = {}) {
      const response = await $api.get('/projects', { params })
      return response.data
    },

    async getProject(id) {
      const response = await $api.get('/projects/' + id)
      return response.data
    }
  }
}
