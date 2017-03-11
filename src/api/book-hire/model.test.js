import { BookHire } from '.'

let bookHire

beforeEach(async () => {
  bookHire = await BookHire.create({ user_email: 'test', book_title: 'test', start_date: 'test', end_date: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = bookHire.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(bookHire.id)
    expect(view.user_email).toBe(bookHire.user_email)
    expect(view.book_title).toBe(bookHire.book_title)
    expect(view.start_date).toBe(bookHire.start_date)
    expect(view.end_date).toBe(bookHire.end_date)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = bookHire.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(bookHire.id)
    expect(view.user_email).toBe(bookHire.user_email)
    expect(view.book_title).toBe(bookHire.book_title)
    expect(view.start_date).toBe(bookHire.start_date)
    expect(view.end_date).toBe(bookHire.end_date)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
