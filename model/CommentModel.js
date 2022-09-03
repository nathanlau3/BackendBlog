const Sequelize = require('sequelize');
module.exports = (sequelize) => {

const Comment = sequelize.define(
    "comment",
    {        
        CommentID: {type: Sequelize.STRING,
            primaryKey: true
        },        
        ArticleID: {type: Sequelize.STRING, allowNull: false},
        CommentUserID: {type: Sequelize.STRING, allowNull: false},
        CommentBody: {type: Sequelize.STRING, allowNull: false} 
    },
    {
        freezeTableName: true
    }
);  
    return Comment;
}