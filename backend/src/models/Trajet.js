import mongoose from "mongoose";

const TrajetSchema = new mongoose.Schema(
  {
    chauffeur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    camion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Camion",
      required: true,
    },
    remorque: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Remoque",
    },
    lieuDepart: {
      type: String,
      required: true,
    },
    lieuArrivee: {
      type: String,
      required: true,
    },
    dateDepart: {
      type: Date,
      required: true,
    },
    dateArriveePrevue: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["planifie", "en_cours", "termine", "annule"],
      default: "planifie",
    },
    kilometrageDepart: {
      type: Number,
    },
    kilometrageArrivee: {
      type: Number,
    },
    carburantConsomme: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Trajet = mongoose.model("Trajet", TrajetSchema);
export default Trajet;