var bodyParser = require("body-parser");
var saveID = require('../models/saveID');
module.exports = function(app) { 
    app.use(bodyParser.urlencoded({ extended: true }));  
    app.get('/',function (req, res) {
                res.render('indexGet')
        })
    app.post('/',async function (req, res) {
        var id = req.body.id;
        saveID.writeID(id);
        res.render('indexPost')
        })
}