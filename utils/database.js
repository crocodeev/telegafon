const mongoose = require('mongoose')
const { MONGODB_URI } = process.env


if (!MONGODB_URI) {
    throw new Error(
      'Please define the MONGODB_URI environment variable inside .env.local'
    )
  }
  

 function dbConnect(callback){

    if (mongoose.connection.readyState >= 1) {
        return
      }

      return mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      },
      callback)
    }

module.exports = dbConnect