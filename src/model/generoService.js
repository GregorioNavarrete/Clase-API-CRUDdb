const db = require("./database/models");
//falta documentar la logica 
const generoService = {
    getAll: async function () {
        try {
            return await db.Generos.findAll();
        } catch (error) {
            console.log(error);
            return [];
        }
    }
}

module.exports = generoService;