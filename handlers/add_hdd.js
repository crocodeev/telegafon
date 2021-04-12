const Client = require('../models/Client')
const Nextid = require('../models/Nextid')


async function add_hdd(phone, hdd, res){

    console.log("hdd_Handler")
    console.log(phone, hdd)
   
    try {

        //check phone number in db

        const obj = await Client.findOne({ "phoneNumber": phone}) || {}
        const jsonObj = JSON.parse(JSON.stringify(obj))

        console.log('entry add', jsonObj);

        if(!jsonObj.phoneNumber){
            return res.status(200).json({
                answer: false,
                chat_id: []
            })
        }
        
        //is hddSerial already exist

        const object = jsonObj.objects.find( item => item.hddSerial === hdd)

        if(object){
            return res.status(200).json({
                answer: true,
                chat_id: object.chat_id
            })
        }

        //get chat_id from another collection

        const nextIdsObject = await Nextid.findOne()
        const chat_id = JSON.parse(JSON.stringify(nextIdsObject)).next_ids

        const newObject = {
            address: "",
            hddSerial: hdd,
            chat_id: chat_id
        }

        console.log('new object', newObject);

        const filter = { phoneNumber: phone }
        const update = { $push: { objects: newObject }}
        
        await Client.findOneAndUpdate(filter, update, { new: true })

        return res.status(200).json({
            answer: true,
            chat_id
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
