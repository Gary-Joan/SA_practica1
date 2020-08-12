const  express = require('express');
const app = express();
const bodyParser = require('body-parser');
const api=require('./api.js');
//especificamos el subdirectorio donde se encuentran las páginas estáticas
app.use(express.static(__dirname+'/public'));
app.set('views', __dirname + '/views'); // general config
app.set('view engine', 'ejs');


//extended: false significa que parsea solo string (no archivos de imagenes por ejemplo)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
app.use(api);


app.listen(8080,function(){
    console.log("Servidor corriendo puerto 8080 servicio encendido....");
});