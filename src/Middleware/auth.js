const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader)
        return res.status(401).json({error: 'Não há token de acesso'});

    const parts = authHeader.split(' ');

    if(!parts.length === 2)
        return res.status(401).json({error:'Token Invalido'});

    const [scheme, token] = parts;

    if(!/^Bearer$/i.test(scheme))
        return res.status(401).json({error: 'Token malformatted'});
    

    jwt.verify(token, process.env.publicKey, (err,decoded) => {
        if(err) return res.status(401).json({error: 'Token invalido'});
        
        req.userId = decoded.id;

        return next();
    })
};