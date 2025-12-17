import Camion from "../models/Camion.js";
import Trajet from "../models/Trajet.js";
import MaintenanceRule from "../models/MaintenanceRule.js";

const getStats = async () => {
    const rules = await MaintenanceRule.findOne({ type: "global" }) || { seuilVidangeKm: 15000, seuilPneusKm: 50000 };

    const camions = await Camion.find();

    const camionsEnAlerte = camions.filter(camion => {
        const kmDepuisVidange = camion.kilometrage - (camion.dernierEntretienKm || 0);
        return kmDepuisVidange >= rules.seuilVidangeKm;
    });

    const totalKmFlotte = camions.reduce((acc, curr) => acc + curr.kilometrage, 0);

    const statsCarburant = await Trajet.aggregate([
        { $match: { status: "termine" } },
        { $group: { _id: null, total: { $sum: "$carburantConsomme" } } }
    ]);
    const totalCarburant = statsCarburant.length > 0 ? statsCarburant[0].total : 0;

    const countTrajets = await Trajet.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);
    
    return {
        kpis: {
            totalKm: totalKmFlotte,
            totalCarburant: totalCarburant,
            nbCamions: camions.length,
            nbChauffeurs: 0, 
            alertesMaintenance: camionsEnAlerte.length
        },
        camionsEnMaintenance: camionsEnAlerte.map(c => ({
            _id: c._id,
            immatriculation: c.immatriculation,
            marque: c.marque,
            depassement: (c.kilometrage - (c.dernierEntretienKm || 0)) - rules.seuilVidangeKm
        })),
        statutsTrajets: countTrajets 
    };
};

export default { getStats };