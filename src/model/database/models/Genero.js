module.exports = (sequelize, DataTypes) => {
    let alias = 'Generos';
    let columns = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ranking: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        active: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }
    let config = {
        tableName: 'genres',
        timestamps: false
    }


    let Genero = sequelize.define(alias, columns, config);

    //falta documentar la logica de abajo 
    
    Genero.associate = (models) => {
        Genero.hasMany(models.Peliculas, {
            as: "peliculas",
            foreignKey: 'genre_id'
        })
    }

    return Genero;

}