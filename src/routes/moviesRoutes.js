const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');

// Listado de peliculas
router.get('/movies', moviesController.list);

// Detalle de pelicula
router.get('/movies/detail/:id', moviesController.getOne);

// Formulario de carga
router.get('/movies/new', moviesController.new);
router.post('/movies', moviesController.create);

// Formulario de edicion
router.get('/movies/:id', moviesController.edit);
router.put('/movies/:id', moviesController.update);

//router.get('/movies/recommended', moviesController.recomended);

// Eliminacion pelicula
router.delete('/movies/:id', moviesController.delete);

module.exports = router;