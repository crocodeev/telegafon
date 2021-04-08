const Client = require('../models/Client')



async function check_hdd(phone, hdd, res){

    try {
    
        
        const obj = await Client.findOne({ "phoneNumber": phone}) || {}
        const jsonObj = JSON.parse(JSON.stringify(obj))

        //check is phone number exist?
        if(!jsonObj.phoneNumber){
            return res.status(200).json({
                answer: false,
                chat_id:[]
            })
        }

        const object = jsonObj.objects.find( item => item.hddSerial === hdd)

        // is hdd number exist?
        if(object){
             return res.status(200).json({
                answer: true,
                chat_id: jsonObj.next_id
            })}else{
            return res.status(200).json({
                answer: false,
                chat_id: []
            })    
            }    
  
    } catch (error) {
        console.log("on authorize")
        console.log(error)

        return res.status(400).json({
            message: "Something went wrong, please try again"
        })
        
    }
    
}

module.exports = check_hdd