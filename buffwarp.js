//input referrer id
//Copy User ID From: Setting/More Setting/Diagnostic/ID
const referrer = "f9aa3824-e07b-411d-9fef-1e74cab061a7";
const timeToLoop = 10; 
// time sleep, currently rate limit might be apply to per min per ip
var colors = require('colors');
function getTime()
{
    let ts = Date.now();
    let date_ob = new Date(ts);
    let hour = date_ob.getHours();
    let min = date_ob.getMinutes() + 1;
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

async function run() {
    return new Promise(resolve => {

        const install_id = genString(11);
        //console.log(install_id);

        const post_data = JSON.stringify({
            key: `${genString(43)}=`, 
            install_id: install_id,
            fcm_token: `${install_id}:APA91b${genString(134)}`,
            referrer: referrer,
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
    process.stdout.write('Cron-job start each minutes hihi: '.yellow.italic);
    for (var i = 0;i<5;i++)
    {
        process.stdout.write('.'.yellow);
        await sleep(1000);
    }
    console.log('\nWaiting for next minute'.gray);

}
async function init() {
    for (let index = 0; index < timeToLoop; index++) {
        if (await run()) {
            console.log('    Success '+'+ 1GB'.yellow.italic+' at '+getTime().yellow.italic);
        } else {
            process.stdout.write('    Done!'.blue+' Waiting for next cron to avoid being spammed!\n')
            process.stdout.write('                        Tran Ngoc                      \n'.blue)
            
            return;
            // Stop luon, cho cron-job khoi dong lai
            // for (let r_index = 0; r_index < retryTimes; r_index++) {
            //     await sleep(sleepSeconds * 1000);
            //     if (await run()) {
            //         break;
            //     } else {
            //         if (r_index == retryTimes -1) {
            //             return;
            //         }
            //     }
            // }
        }
    }
}
function show()
{
    console.log('Started cron-job at '.yellow.italic + getTime());
}
module.exports =
{
    init,
    show,
    loading
}