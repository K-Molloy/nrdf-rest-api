/**
 * Train Test
 *
 * ALL TESTS ARE FOR RAW DATA OUTPUT
 * 
 */
const nTRAINS = require('../models/train')

/**
 * ALL Trains
 * That exist in db.trains
 */
exports.allTrains = (req,res)=>{
    nTRAINS.find((err,docs)=>{
        res.render('reference/singleTrain',docs)
    })
}
/**
 * ALL Trains
 * TD Active
 */
exports.rawAllTDHeadcode = (req, res) => {
    nTRAINS.find({'tdActive': true},'descr',function(err, docs) {
        res.render('nrdf/raw/trainHeadcode',{title: 'TD Activated',trains:docs})
    })
}
/**
 * ALL Trains
 * TD Active
 * Movement Active
 * Schedule Active
 */
exports.rawAllTDMovementHeadcode = (req, res) => {
    nTRAINS.find({'movementActive':true, 'tdActive': true,'scheduleActive':true},'descr',function(err, docs) {
        res.render('nrdf/raw/trainHeadcode',{title: 'TD & Movement & Schedule Activated',trains:docs})
        //res.render('nrdf/raw/test',{title: 'TD & Movement & Schedule Activated',trains:docs})
    })
}
/**
 * ALL Trains - LATE/ ON TIME / EARLY
 * TD Active
 * Movement Active
 * Schedule Active
 */
exports.rawState = (req,res)=>{
    nTRAINS.find({'movementActive':true, 'tdActive': true,'scheduleActive':true},'descr lastMovement.variation_status',function(err, docs) {
        res.render('nrdf/raw/status',{title: 'Status',trains:docs})
        //res.render('nrdf/raw/test',{title: 'Status Raw',trains:docs})
    })
}
