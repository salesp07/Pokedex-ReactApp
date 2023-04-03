const mongoose = require('mongoose')

const errorSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  endpoint: {
    type: String,
    required: true
  },
  code: {
    type: Number,
    required: true
  },
}, {timestamps: true})

module.exports = mongoose.model('errors', errorSchema)




