const generoService = require('../model/generoService');
const peliculaService = require('../model/peliculaService');
const {CreateResponse} = require('./utils/responses')

//falta documentar la logica 
let moviesController = {

  list: async function (req, res) {
    try {
      //con wait esperamos q resuelva la procemsa y la guarde en "peliculas"
      let peliculas = await peliculaService.getAll()
      // Si la obtención de las películas es exitosa, responde con un objeto JSON que contiene las películas
      res.json(peliculas).status(200)
    } catch (error) {

      //Como Resuelve el error en el Servise, esto no sale 
      console.log(error.message);
      //respuesta HTTP que se enviará al cliente
      // En este caso, se está configurando el tipo de contenido a 'text/plain', lo que significa que la respuesta contendrá texto sin formato.
      res.set('Content-Type', 'text/plain')
      res.send("Error inesperado").status(500)
    }
  },
  getOne: function (req, res) {
    peliculaService.getBy(req.params.id)
      .then((pelicula) => {

        //console.log(pelicula);// para ver si se manda los actores 
        res.render('moviesDetail', {movie: pelicula})
      })
      .catch((e) => res.send(e))
  },
  edit: function (req, res) {
    generoService.getAll()
    .then(generos => {
      // Cuando se resuelve la promesa de getAll, obtenemos la lista de géneros.
      peliculaService.getBy(req.params.id)
        .then(
          // Cuando se resuelve la promesa de getBy, obtenemos información sobre la película.
          // Renderiza la página 'editMovie' pasando la información de la película y la lista de géneros a la vista.

          (pelicula) => res.render('editMovie', { pelicula: pelicula, genres: generos   }))
        .catch(
          // Captura cualquier error que ocurra al obtener la información de la película y envía el mensaje de error.
          (e) => res.send(e.message))
    })
    .catch(e => {
      // Captura cualquier error que ocurra al obtener la lista de géneros y envía el mensaje de error.
      res.send(e);
    })

  },
  update: function (req, res) {
    // Llama al método updateBy del servicio peliculaService para actualizar la información de la película.

    peliculaService.updateBy(req.params.id, req.body)
      .then(
        // Cuando la promesa se resuelve con éxito, redirige al usuario a la página de detalles de la película actualizada.
        () => res.redirect(`/movies/${req.params.id}/detail`))
      .catch(
        // Captura cualquier error que ocurra durante la actualización y envía el mensaje de error como respuesta.
        (e) => res.send(e))
  },
  delete: function (req, res) {
    // Llama al método deleteBy del servicio peliculaService para eliminar la película.
    peliculaService.deleteBy(req.params.id)
      .then(
        // Cuando la promesa se resuelve con éxito, redirige al usuario a la página
        () => res.redirect("/movies"))
      .catch(
        // Captura cualquier error que ocurra durante la eliminación
        (error) => {
        console.log(error)
        // Envía el mensaje de error como respuesta al cliente
        res.send(error.message)
      })
  },
  new: async function (req, res) {
    try {
      // Utiliza try para manejar cualquier error que pueda ocurrir dentro del bloque de código
      // Utiliza await para esperar a que la promesa se resuelva antes de continuar.
      let genres = await generoService.getAll();
      res.render('createMovie', {genres: genres});
    } catch (error) {
      // Captura cualquier error que ocurra durante la obtención de la lista de géneros o al renderizar la página
      // Envía el mensaje de error como respuesta al cliente
      res.send(error.message);
    }
  },
  create: async function (req, res) {
    try {
      // Utiliza await para esperar a que la promesa se resuelva antes de continuar.
      let peliculaNueva = await peliculaService.add(req.body);
      // Responde con un código de estado 201 (Creación Exitosa) y un objeto JSON que contiene información sobre la nueva película

       // El objeto CreateResponse parece ser una clase o constructor que crea un objeto con la estructura 
      res.status(201).json(new CreateResponse(peliculaNueva.id, `${req.protocol}://${req.get('host')}${req.originalUrl}/${peliculaNueva.id}`))
    } catch (e) {
      // Captura cualquier error que pueda ocurrir durante el proceso de creación.
      // Envía el mensaje de error como respuesta al cliente y establece el código de estado 500 (Error Interno del Servidor).

      res.send(e.message).status(500);
    } 
  }
}

module.exports = moviesController;