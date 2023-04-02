const mongoose = require('mongoose')

const errorSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
  },
  endpoint: {
    type: String,
    required: true
  },
}, {timestamps: true})

module.exports = mongoose.model('errors', errorSchema)




