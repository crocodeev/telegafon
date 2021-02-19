const Client = require('../models/Client')



async function login(req, res){

    const { phone } = req.body
    
    try {
        //is phone number entry in db?
        
        const { 
            phoneNumber = null
        } = await Client.findOne({ "phoneNumber": phone}) || {}

        if(!phoneNumber){
            return res.status(200).json({
                result: false
            })
        }

        return res.status(200).json({
            result: true
        })
        
    } catch (error) {
        console.log("on login")
        console.log(error)

        return res.status(400).json({
            message: "Something went wrong, please try again later"
        })
        
    }
    
}

module.exports = login