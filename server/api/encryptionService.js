const bcrypt = require('bcrypt');
require('dotenv').config( { path: "./config.env"})

async function hashPassword(password) {
    return bcrypt.hash(password, process.env.SALTROUNDS)
}
async function comparePassword(input, password) {
    return bcrypt.compare(input, password)
}

module.exports = { hashPassword, comparePassword }