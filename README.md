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
