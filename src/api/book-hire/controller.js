import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { BookHire } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  BookHire.create(body)
    .then((bookHire) => bookHire.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  BookHire.find(query, select, cursor)
    .then((bookHires) => bookHires.map((bookHire) => bookHire.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  BookHire.findById(params.id)
    .then(notFound(res))
    .then((bookHire) => bookHire ? bookHire.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  BookHire.findById(params.id)
    .then(notFound(res))
    .then((bookHire) => bookHire ? _.merge(bookHire, body).save() : null)
    .then((bookHire) => bookHire ? bookHire.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  BookHire.findById(params.id)
    .then(notFound(res))
    .then((bookHire) => bookHire ? bookHire.remove() : null)
    .then(success(res, 204))
    .catch(next)
