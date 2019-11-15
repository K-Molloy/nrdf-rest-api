const mongoose = require('mongoose')

const tocSchema = new mongoose.Schema({
    name: string,
    business_code: string,
    sector_code: string,
    atoc_code: string,
    whitelist: boolean,
})

const Toc = mongoose.model('Toc', tocSchema)
module.exports = Toc;