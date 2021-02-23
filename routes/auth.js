const express = require('express')
const router = express.Router()
const loginHandler = require('../handlers/login')
const add_hddHandler = require('../handlers/add_hdd')
const authorizedHandler = require('../handlers/authorized')

router.post('/', async (req, res) => {

    const { status } = req.body

    switch (status) {
        case "login":
            loginHandler(req, res)
            break
        case "add_hdd":
            add_hddHandler(req, res)
            break
        case "authorized":
            authorizedHandler(req, res)
            break         
        default:
            return res.status(400).statusMessage("Bad request")
            break
    }        
})

module.exports = router