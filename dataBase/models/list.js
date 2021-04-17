
module.exports = function initFaq(sequelize, DataTypes) {
    return sequelize.define('list', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        text: DataTypes.TEXT,
        fileName: DataTypes.STRING,
        dateLastNote: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        createdAt: DataTypes.DATE,

    },{
        tableName: 'list',

    });
};