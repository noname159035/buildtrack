import {
  requests,
  getStatusLabel
} from '~/server/data/requests'

export default defineEventHandler(async event => {
  const id = Number(getRouterParam(event, 'id'))
  const body = await readBody(event)

  const request = requests.find(item => item.id === id)

  if (!request) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Запрос не найден'
    })
  }

  const statuses = [
    'pending',
    'approved',
    'declined'
  ]

  if (!statuses.includes(body.status)) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Некорректный статус'
    })
  }

  request.status = body.status
  request.statusLabel = getStatusLabel(body.status)

  return request
})
