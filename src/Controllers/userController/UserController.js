const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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

            if(!name || !email || !pass){
                return res.status(400).json({
                    error: "Preencha todos os campos."
                });
            }

            let user = await User.findOne({ email });
            if(user){
                return res.status(400).json({
                    error: "Usuario já cadastrado."
                });
            }

            user = await User.create({
                name,
                email,
                pass
            });

            return res.json(user);
        }catch(err){
            console.log("Error:" + err);
        }
    },

    async login(req,res){
        const {email,pass} = req.body;
    
        const user = await User.findOne ({email}).select('+password');
    
        if(!user)
            return res.status(400).json({message: 'Usuario não cadastrado'});
    
        if(!await bcrypt.compare(pass, user.pass))
            return res.status(400).json({message: 'Senha incorreta'});
    
        res.send({
            user,
            token: generateToken( {id: user.id }),
        });
    }
}