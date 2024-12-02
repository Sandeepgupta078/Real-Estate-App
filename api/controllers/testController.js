import jwt from 'jsonwebtoken';

export const shouldBeLoggedIn = async (req, res) => {
    // console.log(req.userId)
    res.status(200).json({ message: 'You are Authenticated!' });
}

export const shouldBeAdmin = async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'You are not Authenticated' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(403).json({ message: 'Token is not valid' });
        }
        if (!payload.isAdmin) {
            return res.status(403).json({ message: 'You are not authorized' });
        }
        // req.user = user;
        // next();
    });
    res.status(200).json({ message: 'You are Authenticated and an Admin!' });
}