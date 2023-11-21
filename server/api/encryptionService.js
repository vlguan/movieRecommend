const bcrypt = require('bcrypt');
const crypto = require('crypto');
require('dotenv').config( { path: "./config.env"})
const min = parseInt(process.env.cryptoMin)
const max = parseInt(process.env.cryptoMax)
async function randomNumber(){
    const range = max - min + 1;
    const randomBytes = crypto.randomBytes(4); // 4 bytes for a 32-bit integer
    const randomNumber = randomBytes.readUInt32LE(0) % range + min;
    return randomNumber;
}
async function hashPassword(password) {
    return bcrypt.hash(password, randomNumber())
}
async function comparePassword(input, password) {
    return bcrypt.compare(input, password)
}

module.exports = { hashPassword, comparePassword }