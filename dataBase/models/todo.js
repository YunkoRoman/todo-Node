module.exports = function initFaq(sequelize, DataTypes) {
    const note = sequelize.define('todo', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        text: {
            type: DataTypes.TEXT
        },
        list_id: {
            type: DataTypes.INTEGER,

        },
        date: {
            type: DataTypes.DATE
        },
        checked: {
          type: DataTypes.BOOLEAN
        },
        updatedAt: DataTypes.DATE,
        createdAt: DataTypes.DATE,

    }, {
        tableName: 'todo',

    });

    const category = sequelize.import('./list.js');
    note.belongsTo(category, {foreignKey: 'list_id'});

    return note
}