const express = require('express');
const port =  process.env.PORT || 3000;
const warp = require('./buffwarp');
const app =  express();
const path = require('path');
var bodyParser = require("body-parser");
// INIT
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

// CRON
var CronJob = require('cron').CronJob;
var job = new CronJob('* * * * *', function() {
    warp.show();
    warp.init();
}, null, true);
job.start();

// VIEWS ENGINE
app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname, '/public')));
/* @@END VIEWS ENGINE */

// ROUTE
var route = require('./route/route');  
route(app);

// START
app.listen(port, () => {
    console.log('Server runing on : '+ `${port}`.yellow);
    warp.loading();
});