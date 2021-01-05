const User = require("../models/User");

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require("../config/auth.json");

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400
    });
}

module.exports = {

    async register(req, res) {
        
        const { username, email, password } = req.body;

        try {

            if (await User.findOne({where: {email: email}})) {
                return res.status(401).json({message: "User already exists!"})
            }

            const hash = await bcrypt.hash(password, 12);
    
            const user = await User.create({
                username,
                email,
                password: hash
            });

            user.password = undefined;

            return res.json({
                user,
                token: generateToken({id: user.id})
            });

        } catch(error) {
            return res.status(500).json(error)
        }
        

    },

    async authenticate(req, res) {

        const { email, password } = req.body;

        try {

            const user = await User.findOne({where: {email: email}})

            if (!user) {
                return res.status(401).json({message: "User not found!"})
            }

            if (!await bcrypt.compare(password, user.password)) {
                return res.status(401).json({message: "Invalid password!"});
            }

            user.password = undefined;

            return res.json({ 
                user, 
                token: generateToken({id: user.id}) 
            });

        } catch(error) {
            return res.status(500).json(error);
        }

    },

    async profile(req, res) {

        const userId = req.userId;

        try {

            const user = await User.findByPk(userId);

            user.password = undefined;

            return res.status(200).json({user})

        } catch(error) {
            return res.status(500).json(error);
        }

    }

}