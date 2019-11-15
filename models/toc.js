const mongoose = require('mongoose')

const tocSchema = new mongoose.Schema({
    name: String,
    business_code: String,
    sector_code: String,
    atoc_code: String,
    whitelist: Boolean,
})

const TOCS = mongoose.model('TOCS', tocSchema)
module.exports = TOCS;