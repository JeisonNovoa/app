const express = require('express');
let mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();
//se habilita a express para analizar y leer diferentes datos de la solicitud, por ejemplo
//formularios
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');//se establece express para que maneje plantillas ejs
app.use('/public/', express.static('./public'));//en la carpeta public cargaremos los archivos
//estaticos
const port = 10101;
const pool = mysql.createPool({
connectionLimit : 100,
host     : 'localhost',
user     : 'root',
password : 'Jeison2003',
database : 'users',
debug    : false
});
app.get('/', (req, res) => {
res.render('index')//se retorna la plantilla llamada index al cliente
})
app.get('/interfaz-registro', (req, res) => {
//se retorna la plantilla llamada registro que contiene
//el formulario de registro
res.render('registro')
})
app.post('/registro', (req, res) => {//se obtienen los valores de los inputs del
    //formulario
    //de registro
    let correo = req.body.correo;
    let nombres = req.body.nombres;
    let apellidos = req.body.apellidos;
    let contrasenia = req.body.contrasenia;
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    //convertimos a hash el password del usuario
    const hash = bcrypt.hashSync(contrasenia, salt);
    pool.query("INSERT INTO datos VALUES (?, ?, ?, ?)", [correo, nombres, apellidos, hash],
    (error) => {
    if (error) throw error;
    res.send('registro exitoso');
    });
    })
    app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    })