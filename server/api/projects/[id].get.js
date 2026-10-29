import { getProject } from '~/server/data/projects'

export default defineEventHandler(event => {
  const id = getRouterParam(event, 'id')

  const project = getProject(id)

  if (!project) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Объект не найден'
    })
  }

  return project
})
