const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();

//conectando a base de dados
const uri = "mongodb+srv://jerelson:jerelson@cluster0-y6vik.gcp.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true })
    .then(db => console.log('conectado a nuvem'))
    .catch(err => console.log('Não conectado'));

//importar rotas
const indexRoutes = require('./routes/index');

//Configurações
app.set('port', process.env.PORT || 3000); //define a porta, podendo usar onde quiser

//O usuario verá o item incluso
app.set('views', path.join(__dirname, 'views'));


app.set('view engine', 'ejs');

//middlewares -> uso morgan
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

//rotas
app.use('/', indexRoutes);

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
})