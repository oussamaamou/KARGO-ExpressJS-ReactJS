import Remoque from "../models/Remoque.js";

const createRemoque = async(remoqueData) => {
    const remoqueExist = await Remoque.findOne({ immatriculation: remoqueData.immatriculation})
    if(remoqueExist) throw new Error('Une remorque avec cette immatriculation existe déjà');

    const newRemoque = await Remoque.create(remoqueData);

    return newRemoque;
}

const getAllRemoques = async() => {
    const allRemoques = await Remoque.find().sort({ createdAt: -1});

    return allRemoques;
}

const findRemoqueById = async(id) => {
    const remoque = await Remoque.findById(id);
    if(!remoque) throw new Error('Remoque non trouvée');

    return remoque;
}

const updateRemoque = async(id, updateData) => {
    const remoque = await Remoque.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true
    })
    if(!remoque) throw new Error('Remorque non trouvée pour mise à jour');

    return remoque;
}

const deleteRemoque = async(id) => {
    const remoque = await Remoque.findByIdAndDelete(id);
    if(!remoque) throw new Error('Remorque non trouvée pour suppression');

    return remoque;
}

export default {createRemoque, getAllRemoques, findRemoqueById, updateRemoque, deleteRemoque}