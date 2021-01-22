const bcrypt = require('bcrypt')
const moment = require('moment')

async function hashGenerator(phoneNumber, hddSerial){
    const date = moment().format('DD.MM.YYYY')
    
    const toHash = phoneNumber + hddSerial + date

    try {

        const salt = await bcrypt.genSalt(12)
        const hash = await bcrypt.hash(toHash, salt)

    return(hash)
        
    } catch (error) {
        console.log(error)    
    }
    
}



module.exports = hashGenerator