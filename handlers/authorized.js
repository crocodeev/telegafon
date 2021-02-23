const Client = require('../models/Client')



async function authorized(req, res){

    const { phone,
            hdd } = req.body

    //don't accept requests wit empty hdd        
    if(hdd === undefined){
        return res.status(400).json({
            message: "Where hdd dude?"
        })
    }       
    
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
        //if hdd didn't exist, add to db    
        }else{

            const newObject = {
                address: "",
                hddSerial: hdd
            }
    
            const filter = { phoneNumber: phone }
            const update = { $push: { objects: newObject }}
            
            await Client.findOneAndUpdate(filter, update, { new: true })

            return res.status(200).json({
                result: true
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