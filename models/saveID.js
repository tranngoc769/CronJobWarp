var fs = require('fs');
function readAll()
{
    try {
        const data = fs.readFileSync('./id', 'UTF-8');
        const lines = data.split(/\r?\n/);
        // lines.forEach((line) => {
        //     listID.push(line);
        // });
        return lines;
    } catch (err) {
        console.error(err);
    }
}
function writeID(id)
{
    var isExist  = 0;
    try {
        const data = fs.readFileSync('./id', 'UTF-8');
        const lines = data.split(/\r?\n/);
        lines.forEach((line) => {
            if (line == id)
            {
                isExist = 1;
                return 1;
            }
        });
        if ( isExist == 0)
        {
            fs.appendFile('./id',`${id}\n` , function (err) {
                if (err) throw err;
                console.log('Saved!');
              });
              return 0;
        }
        return 1;
    } catch (err) {
        console.error(err);
    }
    
}
module.exports = 
{
    writeID,
    readAll
}