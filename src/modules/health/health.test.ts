import { request } from '~/infrastructure/test-server'
import { createContent, HttpStatusCode } from '~/infrastructure/create-content'

const baseUrl = '/api/v1/health'

describe('Health', () => {
  test('deve retornar status Ok com dados corretos', async () => {
    const expected = createContent('ok')

    const { statusCode, body } = await request.get(baseUrl)

    expect(statusCode).toBe(HttpStatusCode.Ok)
    expect(body).toStrictEqual(expected)
  })
})
