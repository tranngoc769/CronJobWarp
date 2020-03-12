const express = require('express');
const port =  process.env.PORT || 3000;
const warp = require('./buffwarp');

var CronJob = require('cron').CronJob;
var job = new CronJob('* * * * *', function() {
    warp.show();
    warp.init();
}, null, true, 'America/Los_Angeles');
job.start();

const app =  express();
app.get('/', (req, res) => {
    res.render('index.html');
});

app.listen(port, () => {
    console.log('Server runing on : '+ `${port}`.yellow);
    warp.loading();
});