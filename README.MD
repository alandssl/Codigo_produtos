EXPRESS:
recebe requisições (get, post) do cliente e envia respostas, meio de comunicação cliente- servidor
app.use(express.json()); para o express entender requisições com corpo em json

CORS:
app.use(cors());
libera o acesso de qualquer origem quando o front e o back estão em endereços diferentes
é usado dentro do express
Quando eu importo um arquivo no Node, o Node lê, interpreta e executa todo o código desse arquivo uma vez.
Antes de responder qualquer requisição, verifique se o domínio de quem está pedindo tem permissão.
