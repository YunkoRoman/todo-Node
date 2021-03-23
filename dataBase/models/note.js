
module.exports = function initFaq(sequelize, DataTypes) {
     const note =sequelize.define('note', {
        id: {
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        text: {
            type: DataTypes.TEXT
        },
        category_id: {
            type: DataTypes.INTEGER,

        },
        name: {
            type: DataTypes.STRING
        },
        date: {
            type: DataTypes.DATE
        },
        updatedAt: DataTypes.DATE,
        createdAt: DataTypes.DATE,

    },{
        tableName: 'note',

    });

    const category = sequelize.import('./category.js');
    note.belongsTo(category, {foreignKey: 'category_id'});

    return note
}