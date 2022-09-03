const express = require('express');
const app = express();
const bodyParser = require('body-parser');

var jsonParser = bodyParser.json({limit:"10mb", type:'application/json'}); 
var urlencodedParser = bodyParser.urlencoded({ extended:true,limit:"10mb",type:'application/x-www-form-urlencoded' });
app.use(urlencodedParser);
app.use(jsonParser);

const UserRoute = require('./routes/UserRoute');
app.use('/User', UserRoute);

const ArticleRoute = require('./routes/ArticleRoute');
app.use('/Article', ArticleRoute);

const CommentRoute = require('./routes/CommentRoute');
app.use('/Comment', CommentRoute);

app.listen(5000, () => console.log("Berjalan pada port 5000"));