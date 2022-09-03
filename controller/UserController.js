const sequelize = require('../model/indexModel')
const db = require('../model/indexModel')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const User = db.User

const addUser = async (req, res) => {
    try{        
        let {Email, Username, Fullname, Password} = req.body;
        let getAllAccount = await User.findAll({raw: true});     
        const json = Object.keys(getAllAccount).length;    
        const ts = new Date();
        const UserID = `${ts.getFullYear()}U${json}`;
        Password = await bcrypt.hash(Password, 10);
        const NewUser = new User({
            UserID,
            Email,
            Username,
            Fullname,
            Password
        })

        await NewUser.save();
        res.json(NewUser);
    }
    catch (error)
    {
        console.error(error.message);
        res.status(500).send("server error");
    }
}

const getUser = async (req, res) => {
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
        let getAllUser = await User.findAll({raw: true});
        res.json(getAllUser);
    }
    catch (error)
    {
        console.error(error.message);
        res.status(500).send(error.message);
    }
}

const createToken = async (req, res) => {
    let {Username, Password} = req.body;
    const UserLogin = await User.findOne({raw: true, where:{Username: Username}});
    Password = await bcrypt.hash(Password, 10);
    if (Username != UserLogin.Username && Password != UserLogin.Password)
    {
        return res.send("Invalid User");
    }
    let jwtSecretKey = "secret";
    let data = {
        time: Date(),
        userId: UserLogin.UserID,
    }
  
    const token = jwt.sign(data, jwtSecretKey);
    const balikan = new Object({
        UserID : UserLogin.UserID,
        Token : token
    });
    res.json(balikan);
}

const verified = async (req) => {
    let tokenHeaderKey = "tokenSecret";
    let jwtSecretKey = "secret";
    try {
        let token = req;
        token = token.replace('Bearer ', '');
        const verified = jwt.verify(token, jwtSecretKey);
        if(verified){
            return true;
        }else{
            // Access Denied
            return false;
        }
    } catch (error) {
        // Access Denied
        return false;
    }
}

module.exports = {
    addUser,
    getUser,
    createToken,
    verified
}