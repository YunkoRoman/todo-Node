/* eslint-disable no-unused-vars */
module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('category', {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        text: Sequelize.DataTypes.TEXT,
        dateLastNote: Sequelize.DataTypes.DATE,
        updatedAt: Sequelize.DataTypes.DATE,
        createdAt: Sequelize.DataTypes.DATE,

    }).then(() => queryInterface.createTable('note', {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        text: {
            type: Sequelize.DataTypes.TEXT
        },
        category_id: {
            type: Sequelize.DataTypes.INTEGER,
            references: {
                model: 'category', // name of Target model
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
        queryInterface.dropTable('category', {transaction: t}),
        queryInterface.dropTable('note', {transaction: t}),

    ])),
};
