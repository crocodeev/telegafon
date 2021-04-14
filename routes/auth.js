const express = require('express')
const router = express.Router()
const loginHandler = require('../handlers/login')
const add_hdd = require('../handlers/add_hdd')
const check_hdd = require('../handlers/check_hdd')

router.post('/', async (req, res) => {

    const { phone,
            hdd,
            type } = req.body
    
    
    if(!hdd){
    
        loginHandler(phone, res);
    }else{

        if(type === "check"){

            check_hdd(phone, hdd, res)
        }else if(type === "add"){
    
            add_hdd(phone, hdd, res)
        }else{
            return res.status(400).json({
                message: "Bad request"
            })
        }
    }

           
})

module.exports = router