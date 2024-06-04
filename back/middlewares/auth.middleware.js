const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    console.log("req: ", req);

    try {
        const token = req.header("Authorization");
        if (!token) {
            return res.status(401).json({ msg: "Authentification requise" });
        }

        let tokenWithoutBearer = token.replace("Bearer ", "");

        jwt.verify(tokenWithoutBearer, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ msg: "Token d'authentification invalide" });
            }

            req.user = user.id;
            console.log("req: ", req);

            next();
        }); 
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}

module.exports = auth;