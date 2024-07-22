/**
 * 
 * Declaração de requerimentos
 * 
 */

const servidor = require('express'); // Servidor o qual roda o aplicativo
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const multer = require('multer'); // Para upload de arquivos

const Tesseract = require('tesseract.js');
const Jimp = require('jimp');

const session = require('express-session');

const { auth, security } = require('./funcao');

const app = servidor(); // Inicializa o servidor

const PORT = process.env.PORT || 3000;

//=============================================================================================
//
// Atributos
//
//=============================================================================================

var pagina = [];
var mensagem = [];
var resposta = [];
var imagePath = "";
var configImg = {
    brilho: 0.0, // Valor inicial de brilho
    contraste: 0.0 // Valor inicial de contraste
};

var dados = resposta;

// Define o caminho para os arquivos estáticos (por exemplo, HTML, CSS, imagens)
app.use(servidor.static(path.join(__dirname, '/')));
app.use('/styles', servidor.static(path.join(__dirname, 'pagina/estilo/css', 'styles')));
app.use('/scripts', servidor.static(path.join(__dirname, 'pagina/estilo/js', 'scripts')));

// Use o cookie-parser para analisar os cookies
app.use(cookieParser());

// Configura o mecanismo de templates EJS
app.set('view engine', 'ejs');

// Especifica o diretório de visualização
app.set('views', path.join(__dirname, 'pagina/ejs'));

// Para analisar dados de formulário codificados como application/x-www-form-urlencoded.
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar sessões
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Defina como true se estiver usando HTTPS
}));

// Middleware para desabilitar o cache em todas as rotas
app.use((req, res, next) => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
});

// Middleware para controle de sessão
app.use((req, res, next) => {
    console.log("\nO caminho seguido ", req.path);
    console.log("\nA resposta que deve ser util para os propositos do usuario ");
    console.log("\nA mensagem para avisar o usuario sobre o que esta se passar ");

    if (!req.session.usuario_logado && req.path !== '/iniciar-sessao' && req.path !== '/') {
      return res.redirect('/');
    }

    next();
});



// TRATAMENTO PARA A RECEPCAO DA IMAGEM

// Configurar o armazenamento do multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

//=============================================================================================
//
// ROTAS doGET()
//
//=============================================================================================

app.get("/", (req, res) => {
  res.render('index', { dados });
});

// Rota para a página principal do estudante
app.get('/inicio-estudante', (req, res) => {
  if (req.session.usuario_logado && req.session.usuario_logado.acesso === 'student') {
    res.render('inicial_student', { dados, resposta, mensagem });
  } else {

    res.redirect("/");
  }
});

// Rota para a página principal do professor
app.get('/inicio-professor', (req, res) => {
  if (req.session.usuario_logado && req.session.usuario_logado.acesso === 'teacher') {
    console.log(dados)
    var n = [];
    res.render('inicial_teacher', { dados, resposta, n, configImg });
  } else {

    res.redirect("/");
  }
});


// Rota para terminar a sessão
app.get('/terminar-sessao', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.send('Error logging out.');
    }
    res.redirect('/');
  });
});


//=============================================================================================
//
// ROTAS doPOST()
//
//=============================================================================================

app.post("/iniciar-sessao", (req, res) => {
  // Chamar a função de login
  const result = auth(req.body.usuario, req.body.senha);
  if (result.success) {
    req.session.usuario_logado = result.user;
    dados = [result];
    resposta = result.user
    if (result.user.acesso === 'teacher') {
      res.redirect("/inicio-professor");
    } else {
      res.redirect("/inicio-estudante");
    }
  } else {
    res.redirect("/");
  }
});

app.post("/t", (req, res) => {
  const pageNew = { href: req.body.t, text: req.body.t };
  pagina.push(pageNew);
  res.render('inicial', { dados, pagina });
});


//=============================================================================================
//
// Inicia o servidor
//
//=============================================================================================

app.listen(PORT, () => { 
    console.log(`\nServidor rodando na porta ${PORT}`);
    console.log("\nData e Hora de partida: " + new Date());
});
