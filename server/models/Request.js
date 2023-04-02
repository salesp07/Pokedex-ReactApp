const mongoose = require('mongoose')

const requestSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  endpoint: {
    type: String,
    required: true
  },
}, {timestamps: true})

module.exports = mongoose.model('requests', requestSchema)




