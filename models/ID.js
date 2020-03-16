const mysql = require('mysql');
var connection = require('../models/db');

module.exports = {
    selectAll: async () => {
        var sql = "SELECT * FROM IDtab";
        const rows = await connection.querry(sql);
        return rows;
    },
    deleteID : async (id) =>{
        var sql = `DELETE FROM IDtab WHERE id = "${id}"`;
        try
        {
            await connection.querry(sql);
            return true;
        }
        catch (ex)
        {
            console.log(ex);
            return false;
        }
    },
    insertID : async (id) =>{
        var sql = `INSERT INTO IDtab (id) VALUES ("${id}")`;
        try
        {
            await connection.querry(sql);
            return true;
        }
        catch (ex)
        {
            console.log(ex);
            return false;
        }
    },
    
    

}