import { StatusCodes } from 'http-status-codes'
import createContent from '../../infrastructure/create-content'
import { request } from '../../infrastructure/test-server'

const baseUrl = '/api/v1/health'

describe('Health', () => {
  test('deve retornar status Ok com dados corretos', async () => {
    const expected = createContent(StatusCodes.OK, 'ok')

    const { statusCode, body } = await request.get(baseUrl)

    expect(statusCode).toBe(HttpStatusCode.Ok)
    expect(body).toStrictEqual(expected)
  })
})
