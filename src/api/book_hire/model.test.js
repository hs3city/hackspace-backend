import { BookHire } from '.'
import { User } from '../user'

let user, bookHire

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  bookHire = await BookHire.create({ user, user_id: 'test', book_id: 'test', start_date: 'test', end_date: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = bookHire.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(bookHire.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.user_id).toBe(bookHire.user_id)
    expect(view.book_id).toBe(bookHire.book_id)
    expect(view.start_date).toBe(bookHire.start_date)
    expect(view.end_date).toBe(bookHire.end_date)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = bookHire.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(bookHire.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.user_id).toBe(bookHire.user_id)
    expect(view.book_id).toBe(bookHire.book_id)
    expect(view.start_date).toBe(bookHire.start_date)
    expect(view.end_date).toBe(bookHire.end_date)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
