

module.exports = (sequelize, DataTypes) => {
    let alias = 'Peliculas_Actores'
    let columns = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        movie_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        actor_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

    }
    let config = {
        tableName: 'actor_movie',
        timestamps: false
    }



    let PeliculaActor = sequelize.define(alias, columns, config);

    //falta documentar la logica 
    
    PeliculaActor.associate = function(models){ 
        PeliculaActor.belongsTo(models.Actores, {
            as: "actor",
            foreignKey: "actor_id"
            
        })

        PeliculaActor.belongsTo(models.Peliculas, {
            as: "pelicula",
            foreignKey: "movie_id" })
    }

    return PeliculaActor
}