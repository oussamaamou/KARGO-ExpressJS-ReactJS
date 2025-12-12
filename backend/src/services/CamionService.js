import Camion from "../models/Camion";

const createCamion = async(camionData) => {
    const camionExist = await Camion.findOne({ immatriculation: camionData.immatriculation})
    if(camionExist) throw new Error('Un camion avec cette immatriculation déjà exist');

    const newCamion = await Camion.create(camionData);

    return newCamion;
}

const getAllCamions = async() => {
    const allCamions = await Camion.find().sort({ createdAt: -1});

    return allCamions;
}

const findCamionById = async(id) => {
    const camion = await Camion.findById(id);
    if(!camion) throw new Error('Camion non trouvé');

    return camion;
}

const updateCamion = async(id, updateData) => {
    const camion = await Camion.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true
    })
    if(!camion) throw new Error('Camion non trouvé pour mise à jour');

    return camion;
}

const deleteCamion = async(id) => {
    const camion = await Camion.findByIdAndDelete(id);
    if(!camion) throw new Error('Camion non trouvé pour suppression');

    return camion;
}


export default {createCamion, getAllCamions, findCamionById, updateCamion, deleteCamion}