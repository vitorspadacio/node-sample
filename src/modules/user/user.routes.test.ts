import { StatusCodes } from 'http-status-codes'
import messages from '~/infrastructure/messages'
import userBuilder from '../../infrastructure/builders/user.builder'
import createContent from '../../infrastructure/create-content'
import { request } from '../../infrastructure/test/test-server'

const baseUrl = '/api/v1/user'

describe('User', () => {
  describe('GET', () => {
    test('deve retornar status Ok sem dados e com mensagem informativa', async () => {
      const expected = createContent(StatusCodes.OK, [], 'No data found')

      const { statusCode, body } = await request.get(`${baseUrl}`)

      expect(statusCode).toBe(StatusCodes.OK)
      expect(body).toStrictEqual(expected)
    })

    test('deve retornar status Ok com dados', async () => {
      const user = await userBuilder().insert()
      const expected = createContent(StatusCodes.OK, [user])

      const { statusCode, body } = await request.get(`${baseUrl}`)

      expect(statusCode).toBe(StatusCodes.OK)
      expect(body).toStrictEqual(expected)
    })

    test('deve retornar status Ok com múltiplos usuários', async () => {
      const user1 = await userBuilder().insert()
      const user2 = await userBuilder().insert()

      const expected = createContent(StatusCodes.OK, [user1, user2])

      const { statusCode, body } = await request.get(`${baseUrl}`)

      expect(statusCode).toBe(StatusCodes.OK)
      expect(body).toStrictEqual(expected)
    })

    test('deve retornar status Ok com usuário buscado', async () => {
      const user1 = await userBuilder().insert()
      await userBuilder().insert()
      const payload = { name: user1.name }

      const expected = createContent(StatusCodes.OK, [user1])

      const { statusCode, body } = await request.get(`${baseUrl}`)
        .query(payload)

      expect(statusCode).toBe(StatusCodes.OK)
      expect(body).toStrictEqual(expected)
    })

    test('deve retornar status BadRequest quando informada query inexistente', async () => {
      const expected = createContent(
        StatusCodes.BAD_REQUEST,
        ['"foo" is not allowed'],
        'Request data is invalid',
      )
      const payload = { foo: 'bar' }

      const { statusCode, body } = await request.get(`${baseUrl}`)
        .query(payload)

      expect(statusCode).toBe(StatusCodes.BAD_REQUEST)
      expect(body).toStrictEqual(expected)
    })
  })

  describe('POST', () => {
    test('deve retornar status Created quando enviado user corretamente', async () => {
      const user = userBuilder().create()
      const expected = createContent(
        StatusCodes.CREATED,
        { ...user, id: 1 },
        'User successfully created',
      )

      const { statusCode, body } = await request.post(`${baseUrl}`)
        .send(user)

      expect(statusCode).toBe(StatusCodes.CREATED)
      expect(body).toStrictEqual(expected)
    })

    test('deve retornar status BadRequest quando enviado user incorretamente', async () => {
      const expected = createContent(
        StatusCodes.BAD_REQUEST,
        ['"name" is required', '"age" is required'],
        'Request data is invalid',
      )

      const { statusCode, body } = await request.post(`${baseUrl}`)
        .send({})

      expect(statusCode).toBe(StatusCodes.BAD_REQUEST)
      expect(body).toStrictEqual(expected)
    })
  })
})
