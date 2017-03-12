import request from 'supertest-as-promised'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { BookHire } from '.'

const app = () => express(routes)

let userSession, anotherSession, bookHire

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  bookHire = await BookHire.create({ user })
})

test('POST /book_hires 201 (user)', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ access_token: userSession, user_id: 'test', book_id: 'test', start_date: 'test', end_date: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.user_id).toEqual('test')
  expect(body.book_id).toEqual('test')
  expect(body.start_date).toEqual('test')
  expect(body.end_date).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /book_hires 401', async () => {
  const { status } = await request(app())
    .post('/')
  expect(status).toBe(401)
})

test('GET /book_hires 200', async () => {
  const { status, body } = await request(app())
    .get('/')
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /book_hires/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`/${bookHire.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(bookHire.id)
})

test('GET /book_hires/:id 404', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /book_hires/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`/${bookHire.id}`)
    .send({ access_token: userSession, user_id: 'test', book_id: 'test', start_date: 'test', end_date: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(bookHire.id)
  expect(body.user_id).toEqual('test')
  expect(body.book_id).toEqual('test')
  expect(body.start_date).toEqual('test')
  expect(body.end_date).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /book_hires/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`/${bookHire.id}`)
    .send({ access_token: anotherSession, user_id: 'test', book_id: 'test', start_date: 'test', end_date: 'test' })
  expect(status).toBe(401)
})

test('PUT /book_hires/:id 401', async () => {
  const { status } = await request(app())
    .put(`/${bookHire.id}`)
  expect(status).toBe(401)
})

test('PUT /book_hires/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ access_token: anotherSession, user_id: 'test', book_id: 'test', start_date: 'test', end_date: 'test' })
  expect(status).toBe(404)
})

test('DELETE /book_hires/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`/${bookHire.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /book_hires/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`/${bookHire.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /book_hires/:id 401', async () => {
  const { status } = await request(app())
    .delete(`/${bookHire.id}`)
  expect(status).toBe(401)
})

test('DELETE /book_hires/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
