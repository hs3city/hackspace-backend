import mongoose, { Schema } from 'mongoose'

const booksSchema = new Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  owner: {
    type: String
  }
}, {
  timestamps: true
})

booksSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      title: this.title,
      description: this.description,
      owner: this.owner,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Books', booksSchema)

export const schema = model.schema
export default model
