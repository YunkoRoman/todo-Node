/* eslint-disable no-unused-vars */
module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('list', {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        text: Sequelize.DataTypes.TEXT,
        filePath: Sequelize.DataTypes.STRING,
        dateLastNote: Sequelize.DataTypes.DATE,
        updatedAt: Sequelize.DataTypes.DATE,
        createdAt: Sequelize.DataTypes.DATE,

    }).then(() => queryInterface.createTable('todo', {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        text: {
            type: Sequelize.DataTypes.TEXT
        },
        list_id: {
            type: Sequelize.DataTypes.INTEGER,
            references: {
                model: 'list', // name of Target model
                key: 'id', // key in Target model that we're referencing
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        name: {
            type: Sequelize.DataTypes.STRING(128)
        },
        date: {
            type: Sequelize.DataTypes.DATE
        },
        updatedAt: Sequelize.DataTypes.DATE,
        createdAt: Sequelize.DataTypes.DATE,
    })),

    down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
        queryInterface.dropTable('list-name', {transaction: t}),
        queryInterface.dropTable('to-do', {transaction: t}),

    ])),
};
