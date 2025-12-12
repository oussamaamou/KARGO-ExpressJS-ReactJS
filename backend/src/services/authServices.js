import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerUser = async(userData) => {
    const userExists = await User.findOne({email: userData.email});
    if(userExists){
        throw new Error("Cet utilisateur existe déjà");
    }

    if(!userData.password || userData.password.length < 8 ){
        throw new Error("Le mot de passe doit contenir au moins 8 caractères");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const newUser = await User.create({
        ...userData,
        password: hashedPassword
    })

    return newUser;

}

const loginUser = async(email, password) => {
    const user = await User.findOne({email});
    if(!user){
        throw new Error("Mot de Passe ou Email incorrecte");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        throw new Error("Mot de Passe ou Email incorrecte");
    }

    const token = jwt.sign(
        {id: user._id, role: user.role},
        process.env.JWT_SECRET,
        {expiresIn: "30d"}
    )

    return {user, token};
    
}

export default {registerUser, loginUser};