const express = require('express');
const cron = require('node-cron')
const port =  process.env.PORT || 3000;
const warp = require('./buffwarp');
cron.schedule('* * * * *', () => {
    warp.show();
    warp.init();
});
const app =  express();
app.get('/', (req, res) => {
    res.render('index.html');
});

app.listen(port, () => {
    console.log('Server runing on : '+ `${port}`.yellow);
    warp.loading();
});