const dbConfig = require('../config/database');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,
    },
    dbConfig.timezone
)

sequelize.authenticate().then( () => {console.log('connected to database')})
.catch(err => {console.log('Error' + err)});

const db = {};

db.sequelize = sequelize;

db.User = require('./UserModel')(sequelize);
db.Article = require('./ArticleModel')(sequelize);
db.Comment = require('./CommentModel')(sequelize);

db.sequelize.sync({force: false}).then(() => {
    console.log('yes re-sync done!');
});

module.exports = db, sequelize;