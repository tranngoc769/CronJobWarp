var bodyParser = require("body-parser");
var model = require('../models/ID');
module.exports = function (app) {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.get('/', function (req, res) {
        res.render('indexGet')
    })
    app.post('/', async function (req, res) {
        var id = JSON.parse(JSON.stringify(req.body)).id;
        const existed = await model.insertID(id);
        if (existed == true) {
            res.render('indexPost',
                {
                    title: "Đã tiếp nhận thông tin. Chờ đợi là hạnh phúc !"
                })
        }
        else {
            res.render('indexPost',
                {
                    title: "ID đã tồn tại nha"
                })
        }
    })
    app.post('/delete', async function (req, res) {
        var id = JSON.parse(JSON.stringify(req.body)).id;
        const existed = await model.deleteID(id);
        if (existed == true) {
            res.render('indexPost',
                {
                    title: "Đã dừng"
                })
        }
        else {
            res.render('indexPost',
                {
                    title: "ID không tồn tại nha"
                })
        }
    })
    app.get('/delete', async function (req, res) {
        res.render('delete');
    })
}