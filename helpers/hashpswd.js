const bcrypt = require('bcrypt')

const rawPassword = process.argv[2]
const saultRounds = 10

async function hashPassword(){

    const hash = await bcrypt.hash(rawPassword, saultRounds)
    console.log(hash)
}

hashPassword()
