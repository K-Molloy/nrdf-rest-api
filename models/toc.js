const mongoose = require('mongoose')
var ObjectId = mongoose.Schema.Types.ObjectId;

const tocSchema = new mongoose.Schema({
    _id: ObjectId,
    name: String,
    business_code: String,
    sector_code: String,
    atoc_code: String,
    whitelist: Boolean,
})

const TOCS = mongoose.model('TOCS', tocSchema)
module.exports = TOCS;