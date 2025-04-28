//impotação de dependencias
require(`dotenv`).config(); //carrega variaveis de ambiente de um arquivo .env

const express = require(`express`);

const helmet = require(`helmet`);

const morgan = require(`morgan`);

const cors = require(`cors`);

const path = require(`path`);




const db = require(`./db/db`);//modulo de conexao com o banco de dados

const clienteRoutes = require('./routes/clienteRoutes')

const comodidadeRoutes = require('./routes/comodidadeRoutes')

const ocuparRoutes = require('./routes/ocuparRoutes')

const quartoRoutes = require('./routes/quartoRoutes')

const reservaRoutes = require('./routes/reservaRoutes')



//utilizado para segurança
const corsOption = {
    origin:['http://localhost:3333','http://127.0.0.1:5500'],//lista de origens permitidas
    methods: 'GET,POST,PUT,DELETE',//MÉTODO HTTP PERMITIDOS
    credentials: true,//permite o envio de cookies
};

//inicializacao do app
const app = express();


app.use(express.urlencoded({extended:false}));

app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Headers: Content-Type')
    res.header('Access-Control-Allow-Methods',"GET, POST, PUT, DELETE")

    app.use(cors())
    next()

})
//middlewares de segurança e utilidades

app.use(helmet());// protege a aplicacao com header de segurança(protecao)

app.use(cors(corsOption));// Habilita o cors(protecao)

app.use(morgan('dev')); // loga as requisicoes no console(mostra o tempo q o usuario ficou,em q site , resumindo, guarda informaçoes)

app.use(express.json());//converte os dados recebidos para JSON (vai trafegar pela internet, é o tipo e a extencao do arquivo)

app.use(express.static(path.join(__dirname, 'public')));//pasta de arquivos estáticos

//rota para servir o home.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'home.html'));
});//toda vez q o usuario digitar o nome do site ele vai cair no home.html
// sistema de organização ignorando o nome do usuario  e usa como referencia o pages e home

// se o usuario digitar google.com vai pro home, mas se ele escrever qualquer coisa depois da barra ele vai achar a rota interna do sistema e levar o usuario ate lá 

app.use ('/', clienteRoutes);


app.use ('/', quartoRoutes);


app.use ('/', comodidadeRoutes);


app.use ('/', reservaRoutes);


app.use ('/', ocuparRoutes);


//configuraçao de rotas
// se o usuario digitar google.com vai pro home, mas se ele escrever qualquer coisa depois da barra ele vai achar a rota interna do sistema e levar o usuario ate lá 

//middleware de tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo deu errado');
});




// inicializacao do servidor 
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
});