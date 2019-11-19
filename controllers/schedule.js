/**
 * Train Test
 *
 * ALL TESTS ARE FOR RAW DATA OUTPUT
 * 
 */
const rSchedule = require('../models/schedule')

/**
 * ALL Trains
 * That exist in db.schedule
 */
exports.rawAllTrains = (req,res)=>{
    rSchedule.find((err,docs)=>{
        res.render('nrdf/raw/test',{title:'Raw Schedule',trains:docs})
    })
}
/**
 * Random Train
 */
exports.rawRandomTrain = (req,res)=>{
    rSchedule.count((err,count)=>{
        var random = math.floor(math.random()*count)
        rSchedule.findOne().skip(random).exec((err,docs)=>{
            res.render('nrdf/raw/schedule',{title:'Random Schedule',trains:docs})
        })
    })
    
}
/**
 * ALL Trains
 */
exports. jsonAllTrains= (req, res) => {
    rSchedule.find((err, docs)=>{
        res.json(docs)
    })
}
/**
 * Specific Train where id= headcode
 */
exports.rawTrainsHeadcode = (req, res) => {
    var headcode = req.params;
    rSchedule.find({'CIF_train_uid':headcode},(err, docs) => {
        //res.render('nrdf/schedules/testSingle',{title: 'Schedule',headcode: headcode, trains:docs})
        res.json(docs)
    })
}
/**
 * All Trains on Friday from Northern
 */
exports.rawFridayNorthernSchedule = (req,res)=>{
    rSchedule.find({'schedule_days_runs':'0000010','atoc_code':'NT'},function(err, docs) {
        res.render('nrdf/raw/schedule',{title: 'TOC Schedule',query: 'Northern Rail on Saturdays', trains:docs})
        //res.render('nrdf/raw/test',{title: 'Status Raw',trains:docs})
    })
}
