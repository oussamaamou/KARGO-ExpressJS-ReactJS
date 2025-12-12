import mongoose from 'mongoose';

const RemoqueSchema = new mongoose.Schema(
    {
        immatriculation: {
            type: String,
            required: [true, "L'immatriculation est obligatoire"],
            unique: true,
            trim: true,
            uppercase: true
        },
        type: {
            type: String,
            enum: ["frigo", "bache", "plateau", "citerne"], 
            required: true
        },
        capacite: {
            type: Number, 
            required: true
        },
        status: {
            type: String,
            enum: ["disponible", "en_mission", "maintenance"],
            default: "disponible"
        }
    },
    {
        timestamps: true
    }
)

const Remoque = mongoose.model('Remoque', RemoqueSchema);
export default Remoque;