const mongoose = require('mongoose')
var ObjectId = mongoose.Schema.Types.ObjectId;

const tiplocSchema = new mongoose.Schema({
    _id: ObjectId,
    tiploc_code: String,
    nalco: String,
    stanox: String,
    crs_code: String,
    description: String,
    tps_description: String,
    type: String
})

const TIPLOCS = mongoose.model('tiploc', tiplocSchema)
module.exports = TIPLOCS;