module.exports = (sequelize, DataTypes) => {
    let alias = 'Peliculas';
    let columns = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rating: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        awards: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        release_date: {
            type: DataTypes.DATE
        },
        length: DataTypes.INTEGER,
        
        genre_id: {
            type: DataTypes.INTEGER
        }
    }
    let config = {
        tableName: 'movies',
        timestamps: false
    }


    let Pelicula = sequelize.define(alias, columns, config);

    //falta documentar la logica de abajo 
    
    Pelicula.associate = (models) => {
        Pelicula.hasMany(models.Actores, {
                as: "actoresFans",
                foreignKey: 'favorite_movie_id'
            }),

            // un pelicula puede tener muchas acotores
            // como ya lo tengo definido a la tabla intermedia 
            Pelicula.belongsToMany(models.Actores, {
                as: 'actores',
                through: models.Peliculas_Actores,
                foreignKey: 'movie_id',
                otherKey: 'actor_id',
                timestamps: false
            }),

            //un registro de una tabla puede tener múltiples registros asociados en otra tabla
            Pelicula.hasMany(models.Peliculas_Actores, {
                as: 'peliculaActores',
                foreignKey: 'movie_id'
            }),
            Pelicula.belongsTo(models.Generos, {
                as: "genero",
                foreignKey: 'genre_id'
            })
    }

    return Pelicula;

}