const Sequelize = require('sequelize');
const fs = require('fs');
const {resolve} = require('path');
const config  = require('../config/ENV_config');
module.exports = (() => {
    let instance;
    const env = process.env.NODE_ENV || 'production';

    const params = config[env];
    function initConnection() {
        // const client = new Sequelize(process.env.DATABASE_URL, {
        //     dialectOptions: {
        //         ssl: {
        //             require: true,
        //             rejectUnauthorized: false
        //         }
        //     },
        // });

        const client = new Sequelize(params.database, params.username, params.password, {
            host: params.host,
            dialect: params.dialect,
            define: {
                timestamps: false
            }
        });

        let models = {};
        function  getModels() {
            fs.readdir('./dataBase/models', (err, files) => {
                files.forEach(file => {
                    const [modelName] = file.split('.');
                    models[modelName] = client.import (resolve(`./dataBase/models/${modelName}`))
                });
            });

        }


        return {
            getModel: modelName => models[modelName],
            setModels: () => getModels()

        };
    }

    return {
        getInstance: () => {
            if(!instance) instance = initConnection();
            return instance;
        }
    }
})();