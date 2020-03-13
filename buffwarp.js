//input referrer id
//Copy User ID From: Setting/More Setting/Diagnostic/ID
const referrer = "f9aa3824-e07b-411d-9fef-1e74cab061a7";
const timeToLoop = 10; 
var colors = require('colors');
var readfile = require('./models/saveID');
function getTime()
{
    let ts = Date.now();
    let date_ob = new Date(ts);
    let hour = date_ob.getHours();
    let min = date_ob.getMinutes();
    let sec = date_ob.getSeconds()
    let stringTime =  hour + ":" + min + ":" + sec;
    return stringTime;
}
const https = require("https");
const zlib = require("zlib");

function genString(length) {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function run(id) {
    return new Promise(resolve => {

        const install_id = genString(11);
        //console.log(install_id);

        const post_data = JSON.stringify({
            key: `${genString(43)}=`, 
            install_id: install_id,
            fcm_token: `${install_id}:APA91b${genString(134)}`,
            referrer: id,
            warp_enabled: false,
            tos: new Date().toISOString().replace("Z", "+07:00"),
            type: "Android",
            locale: "en_US"
        });

        const options = {
            hostname: "api.cloudflareclient.com",
            port: 443,
            path: "/v0a745/reg",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Host: "api.cloudflareclient.com",
                Connection: "Keep-Alive",
                "Accept-Encoding": "gzip",
                "User-Agent": "okhttp/3.12.1",
                "Content-Length": post_data.length
            }
        };
        
        const request = https.request(options, result => {
            if (result.statusCode == 429) {
                //too many request
                resolve(false);
            }
            const gzip = zlib.createGunzip();
            result.pipe(gzip);
            gzip.on("data", function(){
            }).on("end", function(){
                resolve(true);
            }).on("error", function(){
                resolve(false);
            });
        });

        request.on("error", error => {
            resolve(false);
        });

        request.write(post_data);
        request.end();
    })
}

async function loading() {
    console.log('\nEach ID will wait 1 minute to avoid spam server'.yellow);
    process.stdout.write('Cron-job start each minutes hihi: '.yellow.italic);
    for (var i = 0;i<5;i++)
    {
        process.stdout.write('.'.yellow);
        await sleep(1000);
    }
    console.log('\nWaiting for next minute'.gray);

}
async function runAllID() 
{
    var lines = readfile.readAll();
    lines.forEach((line) => {
        if(line!='')
        {
            init(line);
        }
    });
}
async function init(id) {
    show(id);
    for (let index = 0; index < timeToLoop; index++) {
        if (await run(id)) {
            console.log('    '+id.yellow+' success '+'+ 1GB'.yellow.italic+' at '+getTime().yellow.italic);
        } else {
            process.stdout.write('    '+id.blue+ ' is done!\n'.blue)
            return;
        }
    }
}
function show(id)
{
    console.log('Started cron-job at '.yellow.italic + getTime() + ' for ID : ' + id.yellow);
}
module.exports =
{
    runAllID,
    loading
}