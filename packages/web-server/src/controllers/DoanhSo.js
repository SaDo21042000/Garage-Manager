const dsService = require('../services/DoanhSo');

/* ````````````Declare your custom controller here `````````````````````*/

const findOne = async (req, res) => {
    console.log('có');
    try {
        let query = req.query;
        console.log('query', req.query);
        let objList = await dsService.findOne(query);
        return res.status(200).json(objList);
    } catch (err) {
        return res.status(500).json({
            statusCode: 500,
            message: err.message || `Some errors occur while finding receiving forms list`
        });
    }
}

// const findOne = async (req, res) => {
//     console.log(req.params);
//     try {
//         let { month, year } = req.params;
//         let objList = await pttService.findOne(id);
//         return res.status(200).json(objList);
//     } catch (err) {
//         return res.status(500).json({
//             statusCode: 500,
//             message: err.message || `Some errors occur while finding receiving forms list`
//         });
//     }
//     res.send("find one")
// }
/* `````````````````````````````````````````````````````````````````````*/

module.exports = {
    findOne,
}