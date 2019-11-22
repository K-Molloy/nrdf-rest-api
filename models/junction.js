const mongoose = require('mongoose')
var ObjectId = mongoose.Schema.Types.ObjectId;

const junctionSchema = new mongoose.Schema({
    _id: ObjectId,
    route_id:String,
    number_of_stops: Number,
    number_of_berths: Number,
    toc: String,
    origin: String,
    destination: String,
    stations:[{
        tiploc_object_id: String,
        tiploc: String,

    }],
    berths:[{
        order:Number,
        berth_id:String,
    }],
    scheduled_trains:[{
        train_object_id: String,
        CIF_train_uid: String,
        headcode: String,
    }],
    statistics:{
        trains_per_week: Number,
        average_delay: Number,
        total_delay: Number,
        ontime_chance: Number,
    },

})

const JUNCTION = mongoose.model('junctions', junctionSchema)
module.exports = JUNCTION;