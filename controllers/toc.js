
const TOCS = require('../models/toc')

/**
 * 
 * @param {Node.js HTTP Request Object} req 
 * @param {Node.js HTTP Response Object} res 
 * @param {Function to invoke next middelware} next 
 */

/**
 * GET /tocs
 * List all TOCS
 */
exports.getTocs = (req,res) => {
    TOCS.find((err, docs) => {
        res.render('reference/getTocs', {
            title: 'Tocs',
            docs,
        });
    })
}
/**
 * POST /tocs
 * Create a TOC
 */
exports.createTocs = (req,res,next) => {
    let cToc = new TOCS(req.body)
    cToc.save((err,toc)=>{
        if (err) {
            res.send(err)
        }
        res.json(toc)
    })
    

}
/**
 * PUT /tocs
 * Update all TOCS
 */
exports.updateTocs = (req,res,next) =>{

}
/**
 * DELETE /tocs
 * Delete all TOCS
 */
exports.deleteTocs = (req,res,next)=> {

}
/**
 * GET /tocs/tocID
 * Lists toc's with ID=tocID
 */
exports.getTocByID = (req,res,next) => {

}
/**
 * PUT /tocs/tocID
 *  Updates toc with ID=tocID 
 */
exports.updateTocByID = (req,res,next) => {

}
/**
 * DELETE /tocs/tocID
 * Deletes toc with ID=tocID
 */
exports.deleteTocByID = (req,res,next) => {

}