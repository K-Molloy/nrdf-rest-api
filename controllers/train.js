const nTrains = require('../models/train')
const rSchedule = require('../models/schedule')
const math = require('mathjs')

/**
 * 
 * @param {Node.js HTTP Request Object} req 
 * @param {Node.js HTTP Response Object} res 
 * @param {Function to invoke next middelware} next 
 */

/**
 * Random Train
 */
exports.rawRandomTrain = (req, res) => {
    rSchedule.countDocuments((err, count) => {
        var random = math.floor(math.random() * count);
        rSchedule.findOne().skip(random).exec((err, docs) => {

            res.render('nrdf/schedules/single', { title: 'Random Schedule', train: docs })
            //res.json(docs)
        })
    })

}
/**
 * Specific Train where id= headcode
 */
exports.getTrainByID = (req, res) => {
    var trainID=req.params.trainID;
    var IDType = checkTrainIDType(trainID);
    if (IDType=='CIF_ID') {
        query = rSchedule.find({ 'CIF_train_uid': trainID });
    }
    else if (IDType=='headcode') {
        query = rSchedule.find({ 'schedule_segment.signalling_id': trainID });
    }
    else if (IDType=='object_ID') {
        query = rSchedule.find({ _id: trainID });
    }
    var promise = query.exec();
    promise.then(docs => {
        //console.log(docs);
        //console.log(docs.length);
        if (docs.length>1) {
            return res.render('nrdf/schedules/multiple', { title: 'Train by ID', trains: docs, message: 'Multiple Trains Found!' });
        }
        else if (docs==undefined || docs.length==0) {
            req.flash('errors',{ msg: 'No Train Found. :/' });
            return res.redirect('/live/schedules');
            
        }
        else{
            //return res.json(docs)
            return res.render('nrdf/schedules/single', { title: 'Train by ID', train: docs[0] });
        }
    })
}
/**
 * getTrainByID Helper Function
 * Calculate TrainID Data Type
 */
function checkTrainIDType(trainID){
    // REGEX for all search types
    // example: CIF_uid = Y78713
    var cif_uid = new RegExp('^[a-zA-Z]{1}[0-9]{5}$');
    // example: Mongo ObjectID=0123456789abcdef012345678
    var objectID = new RegExp('^[0-9a-fA-F]{24}$');
    // example: Headcode = 8K12
    var headcode = new RegExp('^[0-9]{1}[a-zA-Z]{1}[0-9]{2}$'); 

    if (cif_uid.test(trainID)) {
        console.log('REGEX CIF_UID Match: ' + trainID);
        return 'CIF_ID'
    }
    else if (headcode.test(trainID)) {
        console.log('REGEX Headcode Passed: ' + trainID)
        return 'headcode'
    }
    else if (objectID.test(trainID)) {
        console.log('REGEX objectID Passed: ' + trainID)
        return 'object_ID'
    }
    return 'null'
}
/**
 * ALL Trains - LATE/ ON TIME / EARLY
 * TD Active
 * Movement Active
 * Schedule Active
 */
exports.allActiveTrainstatus = (req, res) => {
    nTrains.find({ 'movementActive': true, 'tdActive': true, 'scheduleActive': true }, 'descr lastMovement.variation_status', (err, docs) => {
        res.render('nrdf/raw/status', { title: 'Status', trains: docs })
        //res.render('nrdf/raw/test',{title: 'Status Raw',trains:docs})
    })
}

exports.getLiveTrainByID = (req, res) => {
    var trainID=req.params.trainID;
    var IDType = checkTrainIDType(req.params.trainID);
    if (IDType=='CIF_ID') {
        query = nTrains.find({ 'movementActive': true, 'tdActive': true, 'scheduleActive': true , 'schedule.CIF_train_uid': trainID });
    }
    else if (IDType=='headcode') {
        query = nTrains.find({ 'movementActive': true, 'tdActive': true, 'scheduleActive': true , 'descr': trainID });
    }
    else if (IDType=='object_ID') {
        query = nTrains.find({  'movementActive': true, 'tdActive': true, 'scheduleActive': true ,_id: trainID });
    }
    else{
        req.flash('errors',{ msg: 'Train Not Found. The train may not be live. :/' });
        return res.render('/')
    }
    var promise = query.exec();
    promise.then(docs => {
        //console.log(docs)
        if (checkMultiple(docs)) {
            return res.render('nrdf/raw/test', { title: 'Train by ID', trains: docs})
        }
        else {
            //return res.json(docs)
            return res.render('nrdf/raw/test', { title: 'Train by ID', trains: docs })
        }
    })
}