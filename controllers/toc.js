/**
 * GET /tocs
 * List all TOCS
 */
const Toc = require('./models/toc')

exports.getTocs = (req, res) => {
    Toc.find((err, docs) => {
        res.render('Tocs', { tocs: docs });
    })
}

exports.createTocs = (req, res) => {
    let cToc = req

}