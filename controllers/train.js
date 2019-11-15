/**
 * GET /train
 * List all TOCS
 */
const Train = require('./models/train')

exports.getTrains = (req, res) => {
    Train.find((err, docs) => {
        res.render('Trains', { trains: docs });
    })
}

exports.getTrainById = (req, res) => {
    Train.find(req, (err, docs) => {

    })
}