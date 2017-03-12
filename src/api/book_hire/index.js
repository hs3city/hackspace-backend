import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export BookHire, { schema } from './model'

const router = new Router()
const { user_id, book_id, start_date, end_date } = schema.tree

/**
 * @api {post} /book_hires Create book hire
 * @apiName CreateBookHire
 * @apiGroup BookHire
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam user_id Book hire's user_id.
 * @apiParam book_id Book hire's book_id.
 * @apiParam start_date Book hire's start_date.
 * @apiParam end_date Book hire's end_date.
 * @apiSuccess {Object} bookHire Book hire's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Book hire not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ user_id, book_id, start_date, end_date }),
  create)

/**
 * @api {get} /book_hires Retrieve book hires
 * @apiName RetrieveBookHires
 * @apiGroup BookHire
 * @apiUse listParams
 * @apiSuccess {Object[]} bookHires List of book hires.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /book_hires/:id Retrieve book hire
 * @apiName RetrieveBookHire
 * @apiGroup BookHire
 * @apiSuccess {Object} bookHire Book hire's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Book hire not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /book_hires/:id Update book hire
 * @apiName UpdateBookHire
 * @apiGroup BookHire
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam user_id Book hire's user_id.
 * @apiParam book_id Book hire's book_id.
 * @apiParam start_date Book hire's start_date.
 * @apiParam end_date Book hire's end_date.
 * @apiSuccess {Object} bookHire Book hire's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Book hire not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ user_id, book_id, start_date, end_date }),
  update)

/**
 * @api {delete} /book_hires/:id Delete book hire
 * @apiName DeleteBookHire
 * @apiGroup BookHire
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Book hire not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
