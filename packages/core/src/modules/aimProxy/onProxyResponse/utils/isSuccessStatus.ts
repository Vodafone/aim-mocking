import includes from 'lodash/includes.js'

export default function isSuccessStatus(statusCode: number) {
  const codes = [200, 201, 202, 203, 204, 205, 304]
  return includes(codes, statusCode)
}
