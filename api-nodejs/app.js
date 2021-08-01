var Firebird = require('node-firebird');

var options = {};

options.host = '127.0.0.1';
options.port = 3050;
options.database = '/home/development/dev/TESTE.FDB';
options.user = 'SYSDBA';
options.password = 'masterkey';
options.lowercase_keys = false; // set to true to lowercase keys
options.role = null;            // default
options.pageSize = 4096;        // default when creating database

Firebird.attach(options, function (err, db) {
    if (err)
        throw err;

    // db = DATABASE
    db.query('SELECT * FROM LOGS', function (err, result) {
        // Print line of data
        console.log(result);
        // IMPORTANT: close the connection
        db.detach();
    });
});