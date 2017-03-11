import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export BookHire, { schema } from './model'

const router = new Router()
const { user_email, book_title, start_date, end_date } = schema.tree

/**
 * @api {post} /book-hires Create book hire
 * @apiName CreateBookHire
 * @apiGroup BookHire
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam user_email Book hire's user_email.
 * @apiParam book_title Book hire's book_title.
 * @apiParam start_date Book hire's start_date.
 * @apiParam end_date Book hire's end_date.
 * @apiSuccess {Object} bookHire Book hire's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Book hire not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ user_email, book_title, start_date, end_date }),
  create)

/**
 * @api {get} /book-hires Retrieve book hires
 * @apiName RetrieveBookHires
 * @apiGroup BookHire
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} bookHires List of book hires.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index)

/**
 * @api {get} /book-hires/:id Retrieve book hire
 * @apiName RetrieveBookHire
 * @apiGroup BookHire
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} bookHire Book hire's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Book hire not found.
 * @apiError 401 admin access only.
 */
router.get('/:id',
  token({ required: true, roles: ['admin'] }),
  show)

/**
 * @api {put} /book-hires/:id Update book hire
 * @apiName UpdateBookHire
 * @apiGroup BookHire
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam user_email Book hire's user_email.
 * @apiParam book_title Book hire's book_title.
 * @apiParam start_date Book hire's start_date.
 * @apiParam end_date Book hire's end_date.
 * @apiSuccess {Object} bookHire Book hire's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Book hire not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ user_email, book_title, start_date, end_date }),
  update)

/**
 * @api {delete} /book-hires/:id Delete book hire
 * @apiName DeleteBookHire
 * @apiGroup BookHire
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Book hire not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
