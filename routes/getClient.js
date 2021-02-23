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

    
    if(!admin){
        return res.status(400).json({
            message: "User didn't exist"
        })
    }

        const isMatch = await bcrypt.compare(password, admin.password)

        if(isMatch){

            const {
                objects = {}
            } = await Client.findOne({ "phoneNumber": phone}) || {}

            return res.status(200).json({
                ...objects
            })
            
        }
        
    } catch (error) {
        console.log("Error in getClient: " + error)
        }        
    




       
})

module.exports = router