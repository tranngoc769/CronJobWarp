var fs = require('fs');
function writeID(id)
{
    fs.appendFile('./id',`${id}\n` , function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
}
module.exports = 
{
    writeID
}