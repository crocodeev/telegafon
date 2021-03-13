const Client = require('../models/Client')



async function add_hdd(phone, hdd, res){


   
    try {

        //check phone number in db

        const { 
            phoneNumber = null,
            next_id = []
        } = await Client.findOne({ "phoneNumber": phone}) || {}

        if(!phoneNumber){
            return res.status(200).json({
                "answer": false,
                "chat_id": next_id
            })
        }
        
        const newObject = {
            address: "",
            hddSerial: hdd
        }

        const filter = { phoneNumber: phone }
        const update = { $push: { objects: newObject }}
        
        await Client.findOneAndUpdate(filter, update, { new: true })

        return res.status(200).json({
            "answer": true,
            "chat_id": next_id
        })
        
        
    } catch (error) {
        console.log("on add_hdd")
        console.log(error)

        return res.status(400).json({
            message: "Something went wrong, please try again later"
        })
        
    }
    
}

module.exports = add_hdd
