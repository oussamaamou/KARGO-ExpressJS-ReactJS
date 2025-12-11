import mongoose from "mongoose";

const UserScheme = new mongoose.Schema(
    {
        nom: {
            type: String,
            required: [true, "Le nom est obligatoire"],
            trim: true
        },
        prenom: {
            type: String,
            required: [true, "Le prénom est obligatoire"],
            trim: true
        },
        email: {
            type: String,
            required: [true, "L'email est obligatoire"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                "Veuillez fournir une adresse email valide"
            ]
        },
        password: {
            type: String,
            required: [true, "Le mot de passe est obligatoire"],
            minlength: [8, "Le mot de passe doit contenir au moins 8 caractères"],
            select: true
        },
        role: {
            type: String,
            enum: ['admin', 'chauffeur'],
            default: 'chauffeur'
        },
        numeroPermis: {
            type: String,
            required: function(){ return this.role === 'chauffeur'}
        },
    },
    { timestamps: true }
)

const User = mongoose.model("User", UserScheme);
export default User;
