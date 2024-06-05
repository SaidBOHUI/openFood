const Users = require('../models/userModel');
const bcrypt = require("bcrypt");
const jwt = require ("jsonwebtoken")

const userCtrl = {
    register: async(req, res) => {
        try {
            const {email, password, firstName, lastName} = req.body;
            console.log(req.body)
            const user = await Users.findOne({email : email})
            // console.log(typeof user);
            if (user) {
                console.log("user exist");
                return res.status(400).json({msg : "Cet email est deja utilisé"});
            }             
            if (password.length < 6) return res.status(400).json({msg: "Le mot de passe doit faire 6 caractères minimum. "})
            
            //password encryption 
            const passwordHash = await bcrypt.hash(password, 10)
            const newUser = new Users({
                firstName, lastName, email, password : passwordHash
            })

            await newUser.save()

            const accesstoken = createAccessToken({id : newUser._id})
            const refreshtoken = createRefreshToken({id : newUser._id})

            res.cookie('refreshtoken', refreshtoken,{
                httpOnly : true, 
                path : '/user/refresh_token'
            })
            
            res.json({accesstoken: `Bearer ${accesstoken}`});

        } catch (error) {
            console.log(error);
            return res.status(500).json({msg : error})
        } 
    },

    getUser : async(req, res) => {
        try {
            console.log("GETUSER");
            const user = await Users.findById(req.user.id).select('-password')
            if(!user){
                return res.status(400).json({msg : "Cet utilisateur n'existe pas"})
            }
            res.json(user)
        } catch (error) {
            return res.status(500).json({msg : error.message})
        }
    },
    login : async(req, res) => {
        try {
            console.log("IN BACK");
            const {email, password} = req.body;

            const user = await Users.findOne({email})
            console.log("user: ", user);
            if (!user){
                console.log("Aucun utilisateur n'est connu à cet email");
                return res.status(400).json({msg: "Aucun utilisateur n'est connu à cet email"})
            } 
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch){
                return res.status(400).json({msg : "Mot de passe incorrect"})
            }
            
            // Si login fonctionne on crée le accesstoken et le refreshToken
            const accesstoken = createAccessToken({id : user._id})
            const refreshtoken = createRefreshToken({id : user._id})

            res.cookie('refreshtoken', refreshtoken,{
                httpOnly : true, 
                path : '/user/refresh_token'
            })
            console.log("connected");
            res.json({
                accesstoken: `Bearer ${accesstoken}`, 
                user: {
                    firstName : user.firstName, 
                    lastName : user.lastName, 
                    role: user.role, 
                }
            })
        } catch (error) {
            console.log(error, "ERROR CTRL");
            return res.status(500).json(error.message)
        }
    },
    logout : (req, res) => {
        try {
            res.clearCookie('refreshtoken', {path :  '/user/refresh_token'})
            return res.json({msg : "Vous êtes déconnecté"})
        } catch (error) {
            res.status(500).json({msg : error.message})
        }
    },
	refreshToken: async (req, res) => {
		try {
			const rf_token = req.cookies.refreshtoken;

			if (!rf_token) {
				return res.status(400).json({ msg: "Please login or register" });
			}
			jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
				if (err) {
					res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
					return res.status(400).json({ msg: "Please login or register" });
				}
				const accesstoken = createAccessToken({ id: user.id });
				return res.json({ accesstoken: `Bearer ${accesstoken}` });
			});
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
};

const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'1d'}) 
}

const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn:'7d'}) 
}


module.exports = userCtrl