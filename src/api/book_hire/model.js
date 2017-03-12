import mongoose, { Schema } from 'mongoose'

const bookHireSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  user_id: {
    type: String
  },
  book_id: {
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
      user: this.user.view(full),
      user_id: this.user_id,
      book_id: this.book_id,
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
