import request from 'supertest-as-promised'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { BookHire } from '.'

const app = () => express(routes)

let userSession, adminSession, bookHire

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  bookHire = await BookHire.create({})
})

test('POST /book-hires 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ access_token: adminSession, user_email: 'test', book_title: 'test', start_date: 'test', end_date: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.user_email).toEqual('test')
  expect(body.book_title).toEqual('test')
  expect(body.start_date).toEqual('test')
  expect(body.end_date).toEqual('test')
})

test('POST /book-hires 401 (user)', async () => {
  const { status } = await request(app())
    .post('/')
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /book-hires 401', async () => {
  const { status } = await request(app())
    .post('/')
  expect(status).toBe(401)
})

test('GET /book-hires 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get('/')
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /book-hires 401 (user)', async () => {
  const { status } = await request(app())
    .get('/')
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /book-hires 401', async () => {
  const { status } = await request(app())
    .get('/')
  expect(status).toBe(401)
})

test('GET /book-hires/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`/${bookHire.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(bookHire.id)
})

test('GET /book-hires/:id 401 (user)', async () => {
  const { status } = await request(app())
    .get(`/${bookHire.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /book-hires/:id 401', async () => {
  const { status } = await request(app())
    .get(`/${bookHire.id}`)
  expect(status).toBe(401)
})

test('GET /book-hires/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})

test('PUT /book-hires/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`/${bookHire.id}`)
    .send({ access_token: adminSession, user_email: 'test', book_title: 'test', start_date: 'test', end_date: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(bookHire.id)
  expect(body.user_email).toEqual('test')
  expect(body.book_title).toEqual('test')
  expect(body.start_date).toEqual('test')
  expect(body.end_date).toEqual('test')
})

test('PUT /book-hires/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`/${bookHire.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /book-hires/:id 401', async () => {
  const { status } = await request(app())
    .put(`/${bookHire.id}`)
  expect(status).toBe(401)
})

test('PUT /book-hires/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ access_token: adminSession, user_email: 'test', book_title: 'test', start_date: 'test', end_date: 'test' })
  expect(status).toBe(404)
})

test('DELETE /book-hires/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`/${bookHire.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /book-hires/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`/${bookHire.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /book-hires/:id 401', async () => {
  const { status } = await request(app())
    .delete(`/${bookHire.id}`)
  expect(status).toBe(401)
})

test('DELETE /book-hires/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
