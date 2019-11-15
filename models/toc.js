const mongoose = require('mongoose')

const tocSchema = new mongoose.Schema({
    name: String,
    business_code: String,
    sector_code: String,
    atoc_code: String,
    whitelist: boolean,
})

const Toc = mongoose.model('Toc', tocSchema)
module.exports = Toc;