import CamionService from "../services/CamionService.js";

// @desc Créer un camion
// @route POST/api/camion/
const createCamion = async(req, res, next) => {
    try{
        const camion = await CamionService.createCamion(req.body);
        res.status(201).json({
            success: true,
            data: camion
        })

    } catch(error){
        next(error);
    }
}

// @desc Afficher tous les camions
// @route GET/api/camion/
const getAllCamions = async(req, res, next) => {
    try{
        const camions = await CamionService.getAllCamions();
        res.status(200).json({
            success: true,
            count: camions.length,
            data: camions
        })
    } catch(error){
        next(error);
    }
}

// @desc Modifier les infos d'un camion
// @route PUT/api/camion/:id
const updateCamion = async(req, res, next) => {
    try{
        const camion = await CamionService.updateCamion(req.params.id, req.body);
        res.status(200).json({
            success: true,
            data: camion
        })

    } catch(error){
        next(error)
    }
}

// @desc Suppression d'un camion
// @route DELETE/api/camion/:id
const deleteCamion = async(req, res, next) => {
    try{
        await CamionService.deleteCamion(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Camion supprimé'
        })

    } catch(error){
        next(error)
    }
}

export default {createCamion, getAllCamions, updateCamion, deleteCamion}