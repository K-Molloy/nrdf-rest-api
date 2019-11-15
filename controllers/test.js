/**
 * Train Test
 */
const trains = require('./models/train.js')

exports.oxfordRoad = (req, res, next) => {
    var collection = db.collection('TRAINS')
    collection.find({ 'movementActive': true, 'tdActive': true, 'lastSeen.location.TIPLOC': 'MNCROXR' }).toArray((error, doc) => {
        log.debug(doc)
        resp.end(JSON.stringify(doc))
        next()
    })
}