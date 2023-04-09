const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  favorites: {
    type: Array,
    default: []
  }
}, {timestamps: true})

module.exports = mongoose.model('users', userSchema)




