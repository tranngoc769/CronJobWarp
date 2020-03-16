const mysql = require('mysql');

var conn = mysql.createConnection({
        host: '45.252.248.16',
        port: '3306',
        user: 'vesinhv1',
        password: 'quang7699',
        database: 'vesinhv1_cron'
});
function connect()
{
    conn.connect(function (err){
        if (err) throw err.stack;
        console.log('Connection success');
    });
}
function end()
{
    conn.end(function (err){
        if (err) throw err.stack;
        console.log('End connection success');
    });
}
async function querry (sql){
    return new Promise((resolve, reject) => {
        conn.query(sql, (error, results, fields) => {
            if (error) {
                console.log(error)
                reject(error);
            }
            resolve(results);
        });
    });
};

module.exports = 
{
    end,
    connect,
    querry
}