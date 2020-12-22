const jwt = require("jsonwebtoken");

const User = require("../../Models/user/User");

function generateToken(params ={}){
    return jwt.sign(params, process.env.secret,{
        expiresIn: 86400
    });
}

module.exports = {
    async createUser (req, res){
        try{
            const { 
                name,
                email,
                pass
            } = req.body;
            const access = "user";

            if(!name || !email || !pass){
                return res.status(400).json({
                    error: "Preencha todos os campos."
                });
            }

            let user = await User.find({ email });
            if(user){
                return res.status(400).json({
                    error: "Usuario já cadastrado."
                });
            }

            user = await User.create({
                name,
                email,
                pass,
                access
            });

            return res.json(user);
        }catch(err){
            console.log("Error:" + err);
        }
    }
}