import mongoose, { Schema } from 'mongoose'

const bookHireSchema = new Schema({
  user_email: {
    type: String
  },
  book_title: {
    type: String
  },
  start_date: {
    type: String
  },
  end_date: {
    type: String
  }
}, {
  timestamps: true
})

bookHireSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user_email: this.user_email,
      book_title: this.book_title,
      start_date: this.start_date,
      end_date: this.end_date,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('BookHire', bookHireSchema)

export const schema = model.schema
export default model
