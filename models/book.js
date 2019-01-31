const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const bookSchema = new Schema({
  name: String,
  description: String,
  author: [ {type: Schema.Types.ObjectId, ref: 'Author'} ],
  rating: Number,
  reviews: [ 
    {
      user: String,
      comments: String
    } 
  ]
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;