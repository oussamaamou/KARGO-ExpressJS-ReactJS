import Camion from "../models/Camion.js";
import Trajet from "../models/Trajet.js";

const createTrajet = async (trajetData) => {
    const activeCamionTrajet = await Trajet.findOne({
        camion: trajetData.camion,
        status: { $in: ["planifie", "en_cours"] }
    });

    if (activeCamionTrajet) {
        throw new Error("Ce camion est déjà assigné à une mission en cours ou planifiée.");
    }

    const activeChauffeurTrajet = await Trajet.findOne({
        chauffeur: trajetData.chauffeur,
        status: { $in: ["planifie", "en_cours"] }
    });

    if (activeChauffeurTrajet) {
        throw new Error("Ce chauffeur est déjà en mission.");
    }

    const trajet = await Trajet.create(trajetData);

    await Camion.findByIdAndUpdate(trajetData.camion, { status: 'en_mission' });

    return trajet;
};

const getAllTrajets = async () => {
    return await Trajet.find()
        .populate("chauffeur", "nom email") 
        .populate("camion", "immatriculation marque") 
        .populate("remorque", "immatriculation type")
        .sort({ dateDepart: -1 });
};

const getChauffeurTrajets = async (userId) => {
    return await Trajet.find({ chauffeur: userId })
        .populate("camion", "immatriculation marque")
        .populate("remorque", "immatriculation type")
        .sort({ dateDepart: -1 });
};

export default { createTrajet, getAllTrajets, getChauffeurTrajets };