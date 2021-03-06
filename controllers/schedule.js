/**
 * Schedule Controller Functions
 * 
 * All functions give very basic responses
 * 
 */
const rSchedule = require('../models/schedule')
const rToc = require('../models/toc')
const rTiploc = require('../models/tiploc')
const rRoute = require('../models/route')
const math = require('mathjs')
/**
 * GET /t/schedules
 * Login page.
 */
exports.getScheduleForm = (req, res) => {
    rToc.find({}).lean().select('-_id name').exec((err, tocDocs) => {
        rTiploc.find({}).lean().select('-_id tiploc_code').exec((err, tiplocDocs) => {
            var tocRes = createStringArray(tocDocs, 'name');
            var tipRes = createStringArray(tiplocDocs, 'tiploc_code');

            res.render('nrdf/schedules/selector', { title: 'Schedule Checker', TOCs: tocRes, stations: tipRes })
        })
    })

};
/**
 * 
 */
/**
 * POST /t/schedules
 * Create query using form
 */
exports.postScheduleForm = (req, res) => {
    //request (origin/terminus/TOC)
    rToc.findOne({ 'name': req.body.toc }, 'atoc_code', (err, tocDocs) => {
        rSchedule.
            findOne({
                'schedule_segment.schedule_location': { $elemMatch: { 'tiploc_code': req.body.origin, 'location_type': 'LO' } },
                'schedule_segment.schedule_location': { $elemMatch: { 'tiploc_code': req.body.destination, 'location_type': 'LT' } },
                'atoc_code': tocDocs.atoc_code,
            }, 'CIF_train_uid', (err, docs) => {
                res.redirect('/t/trains/' + docs.CIF_train_uid)
            })
    })
};

/**
 * 
 */
function createStringArray(arr, prop) {
    var result = [];
    for (var i = 0; i < arr.length; i += 1) {
        result.push(arr[i][prop]);
    }
    return result;
}

