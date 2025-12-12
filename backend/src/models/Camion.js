import mongoose from "mongoose";

const CamionSchema = new mongoose.Schema(
    {
        immatriculation: {
            type: String,
            required: [true, "L'immatriculation est obligatoire"],
            unique: true,
            trim: true,
            uppercase: true,
        },
        marque: {
            type: String,
            required: true,
            trim: true
        },
        modele: {
            type: String,
            required: true,
            trim: true
        },
        kilometrage: {
            type: Number,
            default: 0,
            min: [0, "Le kilométrage ne peut pas être négatif"]
        },
        status: {
            type: String,
            enum: ["disponible", "en_mission", "maintenance"],
            default: "disponible"
        },
        dernierEntretienKm: {
            type: Number,
            default: 0
        }
    },
    { 
        timestamps: true
    }
)

const Camion = mongoose.model('Camion', CamionSchema);
export default Camion;
