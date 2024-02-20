const generoService = require("../model/generoService");


//falta documentar la logica 
const genresController = {
    list: (req, res) => {
        generoService.getAll()
        .then(generos => {
            res.render('genresList', {
                genres: generos
            })
        })
        .catch(e => {
            res.send(`Error inesperado ${e.message}`).status(500);
        })
    }
}

module.exports = genresController;