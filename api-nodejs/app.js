/* Incluir a dependência express no prjeto */
const express = require('express');

/* Iniciar a função do express */
const app = express();

var Firebird = require('node-firebird');

var options = {};

options.host = '127.0.0.1';
options.port = 3050;
options.database = 'C:\\Users\\development\\Documents\\dev\\TESTE.FDB';
options.user = 'SYSDBA';
options.password = 'masterkey';
options.lowercase_keys = false; // set to true to lowercase keys
options.role = null;            // default
options.pageSize = 4096;        // default when creating database

/* Permitir a manipulação de dados em formato JSON */
app.use(express.json());

/* Rota raiz */
app.get("/", (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.send({ "msg": "Servidor ativo" })
});

/* Rota teste */
app.get("/teste", (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.send({ "msg": "Teste" })
});

/* Rota dados */
app.get("/dados", (req, res) => {
    /* CORS */
    res.set('Access-Control-Allow-Origin', '*');

    Firebird.attach(options, function (err, db) {
        if (err)
            throw err;

        // db = DATABASE
        db.query('SELECT FIRST 10 * FROM TABELA_DADOS', function (err, result) {
            // IMPORTANT: close the connection
            db.detach();

            return res.json(result);
        });
    });
});

/* Rodar o projeto na porta 8080 */
app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080/");
});