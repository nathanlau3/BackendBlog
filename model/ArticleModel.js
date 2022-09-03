const Sequelize = require('sequelize');
module.exports = (sequelize) => {

const Article = sequelize.define(
    "article",
    {        
        ArticleID: {type: Sequelize.STRING,
            primaryKey: true
        },        
        AuthorUserID: {type: Sequelize.STRING, allowNull: false},
        Title: {type: Sequelize.STRING, allowNull: false},
        Body: {type: Sequelize.STRING, allowNull: false}  
    },
    {
        freezeTableName: true
    }
);  
    return Article;
}