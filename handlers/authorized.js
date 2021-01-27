const Client = require('../models/Client')



async function authorized(req, res){

    const { phone,
            hdd } = req.body
    
    try {
    
        
        const { 
            phoneNumber = null,
            objects = {}
        } = await Client.findOne({ "phoneNumber": phone}) || {}

        //check is phone number exist?
        if(!phoneNumber){
            return res.status(200).json({
                result: false
            })
        }
        //check is hdd serial exist?
        if(objects.find( item => item.hddSerial === hdd)){
            return res.status(200).json({
                result: true
            })
        }else{
            return res.status(200).json({
                result: false
            })
        }

    } catch (error) {
        console.log("on authorize")
        console.log(error)

        return res.status(400).json({
            message: "Something went wrong, please try again later"
        })
        
    }
    
}

module.exports = authorized