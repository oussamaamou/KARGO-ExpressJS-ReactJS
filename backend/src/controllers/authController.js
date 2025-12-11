import authServices from "../services/authServices.js";

// @desc Inscrire un nouvel utilisateur
// @route POST/api/auth/register
const register = async(req, res, next) => {
    try{
        const user = await authServices.registerUser(req.body);

        res.status(201).json({
            success: true,
            message: "L'utilisateur crée avec succes !",
            user: {
                id: user._id,
                nom: user.nom,
                prenom: user.prenom,
                email: user.email,
                role: user.role
            }
        })

    } catch(error){
        next(error);

    }
}

// @desc Connecter un utilisateur et récuperer le token
// @route POST/api/auth/login
const login = async(req, res, next) => {
    try{
        const {email, password} = req.body;

        if(!email || !password){
            res.status(400);
            throw new Error("Veuillez remplir tous les champs");
        }

        const {user, token} = await authServices.loginUser(email, password);

        res.status(200).json({
            success: true,
            message: "Connexion réussie",
            token: token,
            user: {
                id: user._id,
                nom: user.nom,
                role: user.role
            }
        });

    } catch(error){
        next(error);
    }
}

export default {register, login};