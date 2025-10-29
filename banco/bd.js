require('dotenv').config({ path: './env/.env' }); ////ler o arquivo .env para colocar as variaveis dentro do process.env
const express = require('express'); //recebe requisições (get, post) do cliente e envia respostas, meio de comunicação cliente- servidor
const cors = require('cors');      //controla quem pode acessar sua API, precisa ser ativado no servidor que recebe as req HTTP
const sql = require('mssql');

const app = express();
app.use(express.json()); // para o express entender requisições com corpo em json

app.use(cors()); // libera o acesso de qualquer origem quando o front e o back estão em endereços diferentes
//  é usado dentro do express

const config = { //configuração do banco de dados
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: false,
        enableArithAbort: true
    },
    port: 1433
};

const poolPromise = new sql.ConnectionPool(config) //conexão com o banco de dados
    .connect()
    .then(pool => {
        console.log('Conectado ao banco de dados SQL Server');
        return pool;
    })
    .catch(err => {
        console.log('Erro ao conectar ao banco de dados SQL Server: ', err);
        throw err;
    });

// rota para pegar familias

app.get('/familias', async (req, res) => { //req é a requisição que o cliente fez, oque vem de fora,
    // res é oq é usado para responder o cliente
    try {
        const pool = await poolPromise; // agurda a conexão com o BD   
        const result = await pool.request()   // faz a query no banco de dados
            .query(`                    
                SELECT nome, codigo
                FROM FAMILIA`);
        res.json(result.recordset);
    } catch (err) {
        console.error('Erro ao buscar famílias: ', err);
        res.status(500).send('Erro ao buscar famílias');
    }
});

app.get('/grupo/:codigoFamilia', async (req, res) => {
    const codigoFamilia = req.params.codigoFamilia;
    if (!codigoFamilia) return res.status(400).send('Código da família é obrigatório');
    try {
        const pool = await poolPromise;
        const result = await poolPromise.request()
            .input('codigoFamilia', sql.VarChar(5), codigoFamilia)
            .query(`
                SELECT nome, codigo
                FROM GRUPO
                WHERE codigoFamilia = @codigoFamilia`);

        res.json(result.recordset);
    } catch (err) {
        console.log(err);
        console.error('Erro ao buscar grupos: ', err);
    }
});


module.exports = app