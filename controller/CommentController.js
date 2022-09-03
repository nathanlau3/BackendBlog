const db = require('../model/indexModel')
const Comment = db.Comment;
const {verified} = require('./UserController')

const addComment = async (req, res) => {
    try{
        let token = req.headers.authorization;
        if (token == undefined)
        {
            return res.send("Masukkan token anda!")
        }
        if(!verified(token))
        {
            return res.send("Silahkan login dulu")
        };
        const {ArticleID, CommentUserID, CommentBody} = req.body;
        let getAllComment = await Comment.findAll({raw: true});
        const json = Object.keys(getAllComment).length;      
        const ts = new Date();  
        const CommentID = `${ts.getFullYear()}COM${json}`;

        const newComment = new Comment({
            CommentID,
            ArticleID,
            CommentUserID,
            CommentBody
        });

        await newComment.save();
        res.json(newComment);
    }
    catch (error)
    {
        console.error(error.message);
        res.status(500).send("server error");
    }
}

const getComment = async (req, res) => {
    let token = req.headers.authorization;
        if (token == undefined)
        {
            return res.send("Masukkan token anda!")
        }
        if(!verified(token))
        {
            return res.send("Silahkan login dulu")
        };
    let CommentDB = await Comment.findAll({raw: true});
    res.json(CommentDB);
}

module.exports = {
    addComment,
    getComment
}