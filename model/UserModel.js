const Sequelize = require('sequelize');
module.exports = (sequelize) => {

const User = sequelize.define(
    "user",
    {
        // username: {type: Sequelize.STRING},
        // email: {type: Sequelize.STRING},
        // password: {type: Sequelize.STRING}
        UserID: {type: Sequelize.STRING,
            primaryKey: true
        },        
        Email: {type: Sequelize.STRING, allowNull: false},
        Username: {type: Sequelize.STRING, allowNull: false},
        Password: {type: Sequelize.STRING, allowNull: false},
        Fullname: {type: Sequelize.STRING, allowNull: false}        
    },
    {
        freezeTableName: true
    }
);  
    return User;
}