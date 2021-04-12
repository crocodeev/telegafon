const mongoose = require('mongoose')

const schema = new mongoose.Schema(
    {
        name: { type: String },
        phoneNumber: { type: String, required: true, unique: true },
        objects: [{
            address: { type: String },
            hddSerial: { type: String, required: true },
            chat_id: { type: Array }
        }]

    }
)

const Client = mongoose.model('Client', schema)

module.exports = Client