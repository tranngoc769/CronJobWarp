var bodyParser = require("body-parser");
var saveID = require('../models/saveID');
module.exports = function(app) { 
    app.use(bodyParser.urlencoded({ extended: true }));  
    app.get('/',function (req, res) {
                res.render('indexGet')
        })
    app.post('/',async function (req, res) {
        var id = req.body.id;
        var existed = saveID.writeID(id);
        if (existed == 0)
        {

            res.render('indexPost',
            {
                title : "Đã tiếp nhận thông tin. Chờ đợi là hạnh phúc"
            })
        }
        else
        {
            res.render('indexPost',
            {
                title : "ID đã tồn tại nha"
            })
        }
        })
}