const bcrypt = require('bcrypt');
async function hashPassword(password) {
    return bcrypt.hash(password, Math.random())
}
async function comparePassword(input, password) {
    return bcrypt.compare(input, password)
}

module.exports = { hashPassword, comparePassword }