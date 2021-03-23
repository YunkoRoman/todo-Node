
module.exports = function initFaq(sequelize, DataTypes) {
    return sequelize.define('category', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        text: DataTypes.TEXT,
        dateLastNote: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        createdAt: DataTypes.DATE,

    },{
        tableName: 'category',

    });
}