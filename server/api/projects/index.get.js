import { projects } from '~/server/data/projects'

export default defineEventHandler(event => {
  const query = getQuery(event)

  const page = Math.max(Number(query.page) || 1, 1)
  const limit = Math.min(Number(query.limit) || 6, 50)

  const search = String(query.search || '')
    .trim()
    .toLowerCase()

  const status = String(query.status || 'all')

  const filtered = projects.filter(project => {
    const matchesSearch =
      !search ||
      project.name.toLowerCase().includes(search) ||
      project.address.toLowerCase().includes(search)

    const matchesStatus =
      status === 'all' ||
      project.status === status

    return matchesSearch && matchesStatus
  })

  const start = (page - 1) * limit

  return {
    items: filtered.slice(start, start + limit),
    meta: {
      page,
      limit,
      total: filtered.length,
      pages: Math.max(
        Math.ceil(filtered.length / limit),
        1
      )
    }
  }
})
