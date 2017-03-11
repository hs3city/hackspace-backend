import { Books } from '.'

let books

beforeEach(async () => {
  books = await Books.create({ title: 'test', description: 'test', owner: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = books.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(books.id)
    expect(view.title).toBe(books.title)
    expect(view.description).toBe(books.description)
    expect(view.owner).toBe(books.owner)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = books.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(books.id)
    expect(view.title).toBe(books.title)
    expect(view.description).toBe(books.description)
    expect(view.owner).toBe(books.owner)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
