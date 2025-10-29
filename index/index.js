const app = require('../banco/bd.js') // importa o app do bd.js

const port = process.env.PORT || 4000; //porta que o servidor vai rodar
const server = process.env.SERVER || '192.168.1.244'; // servidor que o banco de dados está rodando

app.listen(port, () =>
    console.log(`Servidor ${server} rodando na porta ${port}`));