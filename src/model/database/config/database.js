
//1--- hay que configurar los datos de la BD´s, las q vamos a usar
//2--- para "desarrollo", la que usamos para "prueba" y la que usamos para "produccion"
//3-- para no subir las credenciales privadas, usamos el "dotenv"
module.exports = {
  "development": {
    "username": process.env.DB_USER,
    "password": 'NULL' ? null : process.env.DB_PASS, 
    "database": process.env.DB_NAME,
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
