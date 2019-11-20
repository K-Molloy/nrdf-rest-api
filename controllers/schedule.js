/**
 * Schedule Controller Functions
 * 
 * All functions give very basic responses
 * 
 */
const rSchedule = require('../models/schedule')
const math = require('mathjs')
/**
 * TEST FUNCTION
 * ALL Trains
 * That exist in db.schedule
 * Please DONT use this function
 */
exports.rawAllTrainsToday = (req,res)=>{
    rSchedule.find((err,docs)=>{
        res.render('nrdf/raw/test',{title:'Raw Schedule',trains:docs})
    })
}
/**
 * TEST FUNCTION
 * All Trains on Friday from Northern
 */
exports.rawFridayNorthernSchedule = (req,res)=>{
    rSchedule.find({'schedule_days_runs':'0000010','atoc_code':'NT'},function(err, docs) {
        res.render('nrdf/schedules/multiple',{title: 'TOC Schedule', trains:docs, message:'Northern Rail on Saturdays'})
        //res.render('nrdf/raw/test',{title: 'Status Raw',trains:docs})
    })
}
/**
 * Random Train
 */
exports.rawRandomTrain = (req,res)=>{
    rSchedule.countDocuments((err,count)=>{
        var random = math.floor(math.random()*count);
        rSchedule.findOne().skip(random).exec((err,docs)=>{

            res.render('nrdf/schedules/single',{title:'Random Schedule',trains:docs})
            //res.json(docs)
        })
    })
    
}
/**
 * Specific Train where id= headcode
 */
exports.getTrainByID = (req, res) => {
    var query = getSingleScheduleQuery(req.params.trainID);
    var promise = query.exec();
    promise.then(docs => {
        if (checkMultiple(docs)){
            return res.render('nrdf/schedules/multiple',{title:'Train by ID',trains:docs, message:'Multiple Trains Found!'})
        }
        else {
            //return res.json(docs)
            return res.render('nrdf/schedules/single',{title:'Train by ID',train:docs[0]})
        }
    })
}
/**
 * All Trains where TOC=tocID
 */
exports.rawTrainsTOC = (req,res)=>{
    var tocID=req.params
    rSchedule.find({'schedule_days_runs':'0000010','atoc_code':tocID},function(err, docs) {
        res.render('nrdf/schedules/multiple',{title: 'TOC:'+ toID +'Schedule', trains:docs,message: 'Northern Rail on Saturdays'})
        //res.render('nrdf/raw/test',{title: 'Status Raw',trains:docs})
    })
}
/**
 * Calculate TrainID Data Type
 */
function getSingleScheduleQuery(trainID){
    // REGEX for all search types
    // example: CIF_uid = Y78713
    var cif_uid = new RegExp('^[a-zA-Z]{1}[0-9]{5}$');
    // example: Mongo ObjectID=0123456789abcdef012345678
    var objectID = new RegExp('^[0-9a-fA-F]{24}$');
    // example: Headcode = 8K12
    var headcode = new RegExp('^[0-9]{1}[a-zA-Z]{1}[0-9]{2}$');

    var query;

    if(cif_uid.test(trainID)){
        console.log('CIF_UID Regex Match: '+trainID)
        query = rSchedule.find({'CIF_train_uid':trainID});
    }
    else if(headcode.test(trainID)){
        console.log('Headcode REGEX Passed: '+trainID)
        query = rSchedule.find({'schedule_segment.signalling_id':trainID});
    }
    else if(objectID.test(trainID)){
        console.log('objectID REGEX Passed: '+trainID)
        query = rSchedule.find({ _id: trainID });
    }
    
    
    return query
}

function getStatus(req){
    var query = nTRAINS.find({'movementActive':true, 'tdActive': true,'scheduleActive':true},'descr lastMovement.variation_status');
    return query
}
/**
 * Check for Multiple schedule entries with same headcode
 */
function checkMultiple(docs){
    if (docs.length>1){
        return true
    }
    return false
}
