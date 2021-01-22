const express = require('express')
const router = express.Router()
const Client = require('../models/Client')
const hashGenerator = require('../utils/hashGenerator')

console.log(hashGenerator)

router.post('/', async (req, res) => {

    try {

        const { phone, hdd } = req.body

        const { 
            phoneNumber = null,
            objects = []
        } = await Client.findOne({ "phoneNumber": phone}) || {}

        
        //check is phoneNumber exist
        if(!phoneNumber){
            return res.status(400).json({
                message: "Client does not exist",
                isAuthorized: false
            })
        }

        //is hdd exist?
        const result = objects.find((item) => item.hddSerial === hdd)
        
        if(result === undefined){
            return res.status(400).json({
                message: "Client does not authorize",
                isAuthorized: false
            })
        }

        hash = await hashGenerator()

        return res.status(200).json({
            hash
        })

    } catch (error) {

        console.log(error)

        return res.status(400).json(
            {
                message: "Something went wrong, please try again later"
            }
        )
    }
})

module.exports = router