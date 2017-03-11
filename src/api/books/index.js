import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Books, { schema } from './model'

const router = new Router()
const { title, description, owner } = schema.tree

/**
 * @api {post} /books Create books
 * @apiName CreateBooks
 * @apiGroup Books
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam title Books's title.
 * @apiParam description Books's description.
 * @apiParam owner Books's owner.
 * @apiSuccess {Object} books Books's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Books not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ title, description, owner }),
  create)

/**
 * @api {get} /books Retrieve books
 * @apiName RetrieveBooks
 * @apiGroup Books
 * @apiUse listParams
 * @apiSuccess {Object[]} books List of books.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /books/:id Retrieve books
 * @apiName RetrieveBooks
 * @apiGroup Books
 * @apiSuccess {Object} books Books's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Books not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /books/:id Update books
 * @apiName UpdateBooks
 * @apiGroup Books
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam title Books's title.
 * @apiParam description Books's description.
 * @apiParam owner Books's owner.
 * @apiSuccess {Object} books Books's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Books not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ title, description, owner }),
  update)

/**
 * @api {delete} /books/:id Delete books
 * @apiName DeleteBooks
 * @apiGroup Books
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Books not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
