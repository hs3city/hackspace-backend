import request from 'supertest-as-promised'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Books } from '.'

const app = () => express(routes)

let userSession, adminSession, books

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  books = await Books.create({})
})

test('POST /books 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ access_token: adminSession, title: 'test', description: 'test', owner: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.title).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.owner).toEqual('test')
})

test('POST /books 401 (user)', async () => {
  const { status } = await request(app())
    .post('/')
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /books 401', async () => {
  const { status } = await request(app())
    .post('/')
  expect(status).toBe(401)
})

test('GET /books 200', async () => {
  const { status, body } = await request(app())
    .get('/')
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /books/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`/${books.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(books.id)
})

test('GET /books/:id 404', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /books/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`/${books.id}`)
    .send({ access_token: adminSession, title: 'test', description: 'test', owner: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(books.id)
  expect(body.title).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.owner).toEqual('test')
})

test('PUT /books/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`/${books.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /books/:id 401', async () => {
  const { status } = await request(app())
    .put(`/${books.id}`)
  expect(status).toBe(401)
})

test('PUT /books/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ access_token: adminSession, title: 'test', description: 'test', owner: 'test' })
  expect(status).toBe(404)
})

test('DELETE /books/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`/${books.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /books/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`/${books.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /books/:id 401', async () => {
  const { status } = await request(app())
    .delete(`/${books.id}`)
  expect(status).toBe(401)
})

test('DELETE /books/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
