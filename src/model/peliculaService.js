const db = require('./database/models')
//falta documentar la logica 

const peliculaService = {
    getAll: async function () {
        try {
            let aux = await db.Peliculas.findAll({
                include: [
                    //{ association: "peliculaActores" }
                    { association: "actores" }
                ]
            });
            console.log(aux);
            return aux;
        } catch (error) {
            // Si ocurre un error durante la obtención de las películas:
            // Resuelve el error aquí.
            console.log(error);

            // Retorna un array vacío como manejo del error.
            return [];
        }
    },
    getBy: async function (id) {
        // Intenta obtener una película por su clave primaria (ID)
        // También incluye información sobre los actores asociados a esa película.
        return await db.Peliculas.findByPk(id, {
            include: [{
                /*
                 Indica a Sequelize que debe incluir información sobre los actores asociados a la película.
                 Esto asume que existe una relación entre la tabla Peliculas y la tabla Actores y que está definida en el modelo de Sequelize

                 pero no manda los datos de los actores asociados, solo agrega "actores: [ [Actores], [Actores], [Actores] ]"
                */
                association: 'actores'
            }]
        });

    },
    updateBy: async function (id, body) {
        try {
            return await db.Peliculas.update(
                new Pelicula(body), {
                    //indicamos a quien actualizar de la tabla "Pelicula"
                    where: {
                        id: id
                    }
                }
            )
        } catch (error) {
            // Si ocurre un error durante la actualización:
            console.log(error);
            // Lanza una nueva excepción con un mensaje personalizado.
            //inprimo un mensaje y dejo subir el erro a "controller"
            throw new Error("No se pudo modificar la peli");
        }
    },
    deleteBy: function (id) {
        // Retorna una nueva promesa, para q la maneje el "controller"
        return new Promise((resolve, reject) => {
        // Crea una nueva Promise con un ejecutor que toma dos funciones: resolve y reject.
            db.Peliculas.destroy({
                    //indicamos a quien eliminar de la tabla "Pelicula"
                    where: {
                        id: id
                    }
                })
                .then((resultado) => {
                    // Si la operación de eliminación es exitosa, resuelve la Promise con el resultado.
                    resolve(resultado)
                })
                .catch((error) => {
                    // Si hay algún error durante la operación, rechaza la Promise con el error.
                    reject(error)
                })
        })
    },
    add: async function (body) {
        try {
            // Intenta crear una nueva instancia de la clase Pelicula con la información proporcionada en body.
            const pelicula = new Pelicula(body);
            
            // Intenta agregar la nueva película a la base de datos utilizando Sequelize.
             let crear = await db.Peliculas.create(pelicula);


            console.log(crear.id);//me da el "id" del nuevo registro creado
            return crear;


        } catch (error) {
            // Si hay algún error durante el proceso:
            console.log(error);
            // No se lanza una excepción, pero se registra el error en la consola.
            // Esto permite que el "controller" que llama a esta función maneje el error según sea necesario.
        }
    }
}


function Pelicula({
    title,
    rating,
    awards,
    release_date,
    length,
    genres
}) {
    this.title = title;
    this.rating = rating;
    this.awards = awards;
    this.release_date = release_date;
    this.length = length;
    this.genre_id = genres;
}

module.exports = peliculaService;