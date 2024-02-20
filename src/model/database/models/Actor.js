
module.exports = (sequelize, DataTypes) =>{

    let alias = 'Actores';
    let columns = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        first_name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        rating: DataTypes.DECIMAL,
        favorite_movie_id: DataTypes.INTEGER 
    }

    let config = {
        tableName: 'actors',
        timestamps: false
    }

    let Actor = sequelize.define(alias, columns, config);

    //falta documentar la logica de abajo 
    
    Actor.associate = function(models){

        //un actor pertenece a una película como su película favorita
        // Establece una relación donde un registro de una tabla pertenece a otro registro en otra tabla.
        Actor.belongsTo(models.Peliculas, {
            as: 'peliculaFavorita',
            foreignKey: 'favorite_movie_id'
        })

        //un actor puede estar asociado con varias películas y viceversa

        // un actor puede tener muchas peliculas
        Actor.belongsToMany(models.Peliculas, {
            as: 'Peliculas',
            through: models.Peliculas_Actores,
            foreignKey: 'actor_id',
            otherKey: 'movie_id',
            timestamps: false
        })

        // una relación de uno a muchos (hasMany)
        //Establece una relación donde un registro de una tabla puede tener múltiples registros asociados en otra tabla
        Actor.hasMany(models.Peliculas_Actores, {
            as: 'peliculaActores',
            foreignKey:'actor_id'
        })
    }

    return Actor;
}
