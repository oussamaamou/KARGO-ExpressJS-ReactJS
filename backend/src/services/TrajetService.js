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
        .populate("chauffeur", "nom prenom email") 
        .populate("camion", "immatriculation marque") 
        .populate("remorque", "immatriculation type")
        .sort({ dateDepart: -1 });
};

const getChauffeurTrajets = async (userId) => {
    return await Trajet.find({ chauffeur: userId })
        .populate("chauffeur", "nom prenom email") 
        .populate("camion", "immatriculation marque")
        .populate("remorque", "immatriculation type")
        .sort({ dateDepart: -1 });
};

const updateTrajetStatus = async (id, status, data = {}) => {
    const trajet = await Trajet.findById(id);
    if (!trajet) throw new Error("Trajet non trouvé");

    if (trajet.status === 'termine') {
        throw new Error("Ce trajet est déjà terminé.");
    }

    if (status === 'termine') {
        if (!data.kilometrageArrivee || !data.carburantConsomme) {
            throw new Error("Le kilométrage d'arrivée et le carburant sont obligatoires pour terminer la mission.");
        }

        const camion = await Camion.findById(trajet.camion);

        if (data.kilometrageArrivee < camion.kilometrage) {
            throw new Error(`Le kilométrage d'arrivée (${data.kilometrageArrivee}) ne peut pas être inférieur au kilométrage actuel du camion (${camion.kilometrage}).`);
        }

        trajet.kilometrageArrivee = data.kilometrageArrivee;
        trajet.carburantConsomme = data.carburantConsomme;

        camion.kilometrage = data.kilometrageArrivee;
        camion.status = 'disponible'; 
        await camion.save();
    }

    trajet.status = status;
    return await trajet.save();
};

export default { createTrajet, getAllTrajets, getChauffeurTrajets, updateTrajetStatus };