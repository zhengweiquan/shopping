import http from '../utils/http'
export function getidAPI(id) {
  return http({
    url: '/category',
    params: {
      id
    }
  })
}