import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Books } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Books.create(body)
    .then((books) => books.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Books.find(query, select, cursor)
    .then((books) => books.map((books) => books.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Books.findById(params.id)
    .then(notFound(res))
    .then((books) => books ? books.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Books.findById(params.id)
    .then(notFound(res))
    .then((books) => books ? _.merge(books, body).save() : null)
    .then((books) => books ? books.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Books.findById(params.id)
    .then(notFound(res))
    .then((books) => books ? books.remove() : null)
    .then(success(res, 204))
    .catch(next)
