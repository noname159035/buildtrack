import { requests } from '~/server/data/requests'

export default defineEventHandler(() => {
  return {
    items: requests
  }
})
