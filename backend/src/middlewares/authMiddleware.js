import jwt from 'jsonwebtoken';
import User from '../models/User';

const protect = async(req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            token = req.headers.authorization.split(" ")[1];

            const decode = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decode.id).select("-password");

            next();

        } catch(error){
            console.log(error);
            res.status(401);
            next(new Error("Non autorisé, Token invalide"));
        }
    }

    if(!token){
        res.status(401);
        throw new Error("Non autorisé, aucun Token fourni")
    }
}

const authorize = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            res.status(403);
            return next(
                new Error(`Le rôle utilisateur '${req.user.role}' n'est pas autorisé à accéder à cette route`)
            );
        }

        next();
    }

}

export default {protect, authorize};