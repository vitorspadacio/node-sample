import { StatusCodes } from 'http-status-codes'
import userBuilder from '../../infrastructure/builders/user.builder'
import createContent from '../../infrastructure/create-content'
import { request } from '../../infrastructure/test/test-server'
import userRepository from './user.repository'

const baseUrl = '/api/v1/user'

describe('User', () => {
  describe('GET', () => {
    test('deve retornar status Ok sem dados e com mensagem informativa', async () => {
      const expected = createContent(StatusCodes.OK, [], 'No data found')

      const { statusCode, body } = await request.get(`${baseUrl}`)

      expect(statusCode).toBe(expected.code)
      expect(body).toStrictEqual(expected)
    })

    test('deve retornar status Ok com dados', async () => {
      const user = await userBuilder().insert()
      const expected = createContent(StatusCodes.OK, [user])

      const { statusCode, body } = await request.get(`${baseUrl}`)

      expect(statusCode).toBe(expected.code)
      expect(body).toStrictEqual(expected)
    })

    test('deve retornar status Ok com múltiplos usuários', async () => {
      const user1 = await userBuilder().insert()
      const user2 = await userBuilder().insert()

      const expected = createContent(StatusCodes.OK, [user1, user2])

      const { statusCode, body } = await request.get(`${baseUrl}`)

      expect(statusCode).toBe(expected.code)
      expect(body).toStrictEqual(expected)
    })

    test('deve retornar status Ok com usuário buscado', async () => {
      const user1 = await userBuilder().insert()
      await userBuilder().insert()
      const payload = { name: user1.name }

      const expected = createContent(StatusCodes.OK, [user1])

      const { statusCode, body } = await request.get(`${baseUrl}`)
        .query(payload)

      expect(statusCode).toBe(expected.code)
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

      expect(statusCode).toBe(expected.code)
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

      expect(statusCode).toBe(expected.code)
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

      expect(statusCode).toBe(expected.code)
      expect(body).toStrictEqual(expected)
    })
  })

  describe('DELETE', () => {
    test('deve retornar status Accepted quando user for deletado corretamente', async () => {
      const { id } = await userBuilder().insert()
      const expected = createContent(StatusCodes.ACCEPTED, {}, 'User successfully deleted')

      const { statusCode, body } = await request.delete(`${baseUrl}`)
        .query({ id })

      expect(statusCode).toBe(expected.code)
      expect(body).toStrictEqual(expected)

      const user = await userRepository.getById(id || 0)
      expect(user).toBeUndefined()
    })

    test('deve retornar status BadRequest quando não encontrar user com id fornecido', async () => {
      const expected = createContent(StatusCodes.BAD_REQUEST, {}, 'Entity not found with id 1')

      const { statusCode, body } = await request.delete(`${baseUrl}`)
        .query({ id: 1 })

      expect(statusCode).toBe(expected.code)
      expect(body).toStrictEqual(expected)
    })

    test('deve retornar status BadRequest quando não fornecer id do user', async () => {
      const expected = createContent(
        StatusCodes.BAD_REQUEST,
        ['"id" is required'],
        'Request data is invalid',
      )

      const { statusCode, body } = await request.delete(`${baseUrl}`)

      expect(statusCode).toBe(expected.code)
      expect(body).toStrictEqual(expected)
    })
  })
})
