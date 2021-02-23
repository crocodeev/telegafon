const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const Client = require('../models/Client')
const Admin = require('../models/Admin')

router.post('/', async (req, res) => {

    const { login,
            password,
            phone } = req.body 

    try {

        const admin = await Admin.findOne({ login })

        console.log(admin);
    
    if(!admin){
        return res.status(400).json({
            message: "User didn't exist"
        })
    }

        const isMatch = await bcrypt.compare(password, admin.password)

        if(isMatch){

            const result = await Client.create({ "phoneNumber": phone }) || {}

            console.log(result)

            return res.status(200).json({
                message: "Object created"
            })
            
        }
        
    } catch (error) {
        console.log("Error in getClient: " + error)
        }        
    




       
})

module.exports = router