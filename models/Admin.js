const mongoose = require('mongoose')

const schema = new mongoose.Schema(
    {
        login: { type: String, unique: true },
        password: { type: String, required: true },
        
    }
)

const Client = mongoose.model('Admin', schema)

module.exports = Client