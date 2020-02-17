# API-REST com NodeJs, MySQL e Express
### o que é API-REST e por que utiliar ?
#### Representational State Transfer (REST), em português Transferência Representacional de Estado, é uma arquitetura de software que define um conjunto de restrições a serem usados para a criação de web services (serviços Web). Isso para nós desenvolvedores e uma baita mão na roda, já que uma vez criada podemos utilizá la para diversos fins, seja para aplicações web, desktop ou até mesmo mobile. Sendo assim os clients de REST podem buscar ou manipular dados de um banco de dados diretamente por rotas de navegação.

<img src="https://i.pinimg.com/originals/1e/a2/bf/1ea2bf43d262adc533f6ba78a7772a9c.gif" />

### Bom mais enfim, vamos a prática 🙇‍
#### Primeiro passo é instalar as dependências da aplicação, então rode os comandos em seu terminal.
     1° - instale o express-generator  -g
     2° - express 
     3° - npm install mysql --save 
     4° - npm install cors --save  
     5° - npm install  
     6° - npm install nodemon --save 
#### Antes de começarmos mexer no cod em si, vamos configurar nosso nodemon esse cara será responsável por restartar nosso servidor todos as vezes em que salvarmos nossa aplicação. Então para isso vá no seu Package.json e insira a seguinte linha dentro do corpo script. Ex.:
  ``` 
  
    "scripts": {
      "start": "node ./bin/www",
      "nodemon": "nodemon ./bin/www"
    }
    
  ```
     
#### Se tudo deu certo no tópico anterior, então vamos criar nosso super banco de dados, para isso crie um banco de dados com o nome produtos e uma tabela com o nome item, dessa forma:
#### Banco:
```
  create database produtos
```
#### Tabela:
```

 create table `item` (
   `ID` int(11) auto_increment,
   `NOME` varchar(50) NOT NULL,
   `SKU` varchar(30) NOT NULL,
   `PRECO` FLOAT NOT NULL,
  primary key(`ID`)
);

```
#### Espero que tudo tenha dado certo! Insira alguns valores em sua tabela. ex.:
```
INSERT INTO item (`NOME`,`SKU`,`PRECO`) VALUES 
     ('Feijão','23EEDEDS', 6.00),
     ('Arroz','949KMFW', 14.00),
     ('Batata','WDREFF33', 4.00),
     ('Macarrão','2323DKCJJ', 5.20),
     ('Oléo de Soja','PPPP2323', 8.00),
     ('Pasta de Dente','23DDWWQCV', 7.50),
     ('Queijo','BFEORIC2', 3.20),
     ('Farinha','1LDKCKSPWE', 4.00);

```
#### Dentro da raiz do nosso projeto, crie uma conexão com o banco de dados, com o nome de <i> connectDB.js</i> e insira a conexão, algo assim:
```
const mysql = require('mysql');
const con = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database:'produtos'
});

module.exports = con;

```

#### Crie na raiz do projeto também uma pasta chamada <i>models</i> dentro dessa pasta iremos criar um arquivo .js com o nome de <i>Item.js</i>, assim que criado dentro dele você deve criar algo dessa forma:
```
const db = require('../connectDB');
var Item={

    getAll:(callback) => { 
        return db.query("Select * from item",callback);
    },

    getById:(id,callback) => {
        return db.query("select * from item where ID=?",[id],callback);
    },

    add:function( dt ,callback){
        return db.query("Insert into item values(?,?,?)", [ dt.name, dt.sku, dt.price ],callback);
    },

    delete:(id,callback) => {
        return db.query("delete from item where ID=?",[id],callback);
    },

    update:( sku, dt ,callback ) => {
        return db.query("update item set PRECO=? where SKU=?", [ dt.price, sku], callback);
    }
 
};

module.exports = Item;

```
#### Na raiz do projeto, dentro da pasta <i>routes</i>, crie um arquivo chamado <i>tableImte.js</i>, é nesse arquivo que você definira as rotas de acesso para o model. ex.:
```
var express = require('express');
var router = express.Router();
var Item = require('../models/Item');


router.get('/', (req, res, next) => {
    if(!req.query.id){
        Item.getAll((err, rows) => {
            if (err) {
                res.json(err);
            }
            else {
                res.json(rows);
            }
        });
    }else {
        Item.getById(req.query.id, (err, rows) => {
            if (err) {
                res.json(err);
            }
            else {
                res.json(rows);
            }
        });
    }
});

router.post('/', (req, res, next) => {
    Item.add(req.body, (err, count) => {
        if (err) {
            res.json(err);
        }
        else {
            res.json(req.body);
        }
    });
});

router.delete('/:id', (req, res, next) => {
    Item.delete(req.query.id, (err, count) => {
        if (err) {
            res.json(err);
        }
        else {
            res.json(count);
        }
    });
});

router.put('/:id', (req, res, next) => {
    Item.update(req.query.id, req.body, (err, rows) => {
        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }
    });
});

module.exports = router;

```
#### Enfim 💆‍ quase tudo certo, antes vamos chamar nosso método CORS, para não termos problemas com domínios cruzados, e também definir nossa rota /item . Dentro do nosso arquivo <i>app.js</i> adicione :
```
var cors=require('cors');
var itemTable = require('./routes/TableItem');
app.use(cors());
app.use('/item', itemTable);

```
#### O arquivo <i>app.js</i> ficará dessa forma:
```
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors=require('cors');
var itemTable = require('./routes/TableItem');
var app = express();

//cors adic
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/item', itemTable);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

```
### FIMMMM 
#### Agora você, acesse as rotas atraves de alguma REST client, como postman ou insomnia. 
```
(get) http://localhost:3000/item	
(get) http://localhost:3000/Tasks/item	
(delete) http://localhost:3000/Tasks/item	
(post) http://localhost:3000/item (dados body)
(put) http://localhost:3000/item/1	(dados body)

```
## Espero que tudo tenha dado certo para você ai.🕺
<img src="https://media1.giphy.com/media/ckeHl52mNtoq87veET/giphy.gif" />
