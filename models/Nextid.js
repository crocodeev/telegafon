const mongoose = require('mongoose')

const schema = new mongoose.Schema(
    {
        next_ids: [{ type: String }]
    }
)

const Nextid = mongoose.model('Nextid', schema)

module.exports = Nextid