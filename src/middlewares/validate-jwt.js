import jwt from 'jsonwebtoken';
import User from '../user/user.model.js';
export const validateJWT = async (req, res, next) => {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer ')) return res.status(401).json({ success: false, message: 'Bearer token required' });
    let uid;
    try { ({ uid } = jwt.verify(header.slice(7), process.env.SECRETORPRIVATEKEY, { algorithms: ['HS256'] })); }
    catch { return res.status(401).json({ success: false, message: 'Invalid or expired token' }); }
    try {
        const user = await User.findById(uid);
        if (!user || !user.status) return res.status(401).json({ success: false, message: 'Inactive user' });
        req.usuario = user; next();
    } catch { return res.status(503).json({ success: false, message: 'Authentication unavailable' }); }
};
