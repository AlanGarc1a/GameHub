const jwt = require('jsonwebtoken');

module.exports = {
    signInAccessToken: (userId) => {

        const payload = {
            id: userId
        };

        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    },
    verifyAccessToken: (token) => {
        return jwt.verify(token, process.env.JWT_SECRET);
    },
    //middleware
    auth: (req, res, next) => {
        try {
            const token = req.header("x-auth-token");

            if(!token) {
                return res.status(401).json({ msg: "No authentication token, access denied"});
            }

            const verified = jwt.verify(token, process.env.JWT_SECRET);

            if(!verified) {
                return res.status(401).json({ msg: 'Token verification failed, authorization denied'});
            }

            req.user = verified.id;

            next();
        } catch(err) {
            res.status(500).json({ error: err.message });
        }
    }
};