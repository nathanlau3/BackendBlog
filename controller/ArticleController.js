const db = require('../model/indexModel');
const {verified} = require('./UserController')
const Article = db.Article;

const addArticle = async (req, res) => {
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

        const {AuthorUserID, Title, Body} = req.body;
        let getAllArticle = await Article.findAll({raw: true});
        const json = Object.keys(getAllArticle).length;
        const ts = new Date();
        const ArticleID = `${ts.getFullYear()}A${json}`;
        const NewArticle = new Article({
            ArticleID,
            AuthorUserID,
            Title,
            Body
        })

        await NewArticle.save();
        res.json(NewArticle);
    }
    catch (error)
    {
        console.error(error.message);
        res.status(500).send("server error");
    }
}

const getAllArticle = async (req, res) => {
    
    let token = req.headers.authorization;
        if (token == undefined)
        {
            return res.send("Masukkan token anda!")
        }
        if(!verified(token))
        {
            return res.send("Silahkan login dulu")
        };

    let ArticleDB = await Article.findAll({raw: true});
    res.json(ArticleDB);
}

const updateArtcile = async (req, res) => {
    try {
        let token = req.headers.authorization;
        if (token == undefined)
        {
            return res.send("Masukkan token anda!")
        }
        if(!verified(token))
        {
            return res.send("Silahkan login dulu")
        };

        let {ArticleID, AuthorUserID, Title, Body} = req.body;
        // let ArticleDB = await Article.findOne({
        //     where: {
        //         ArticleID : ArticleID
        //     },
        //     raw: true
        // });

        var ArticleFix = {
            AuthorUserID : AuthorUserID,
            ArticleID : ArticleID,
            Title : Title,
            Body : Body
        }
        //update
        await Article.update(ArticleFix, {where:{
            ArticleID : ArticleID
        }});
        res.status(200).send("Update data success");
    }
    catch (error)
    {
        console.error(error.message);
        res.status(500).send(error.message);
    }
    
}

const deleteArticle = async (req, res) => {
    try {
        let token = req.headers.authorization;
        if (token == undefined)
        {
            return res.send("Masukkan token anda!")
        }
        if(!verified(token))
        {
            return res.send("Silahkan login dulu")
        };
        let {ArticleID} = req.body;        
        //delete
        await Article.destroy({where:{
            ArticleID : ArticleID
        }});
        res.status(200).send("Delete data success");
    }
    catch (error)
    {
        console.error(error.message);
        res.status(500).send(error.message);
    }
}

module.exports = {
    addArticle,
    getAllArticle,
    updateArtcile,
    deleteArticle
}