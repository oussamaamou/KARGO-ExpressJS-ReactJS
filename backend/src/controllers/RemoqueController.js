import RemoqueService from "../services/RemoqueService.js";

// @desc Créer une remorque
// @route POST /api/remoque/
const createRemoque = async(req, res, next) => {
    try{
        const remoque = await RemoqueService.createRemoque(req.body);
        res.status(201).json({
            success: true,
            data: remoque
        })
    } catch(error){
        next(error);
    }
}

// @desc Afficher toutes les remorques
// @route GET /api/remoque/
const getAllRemoques = async(req, res, next) => {
    try{
        const remoques = await RemoqueService.getAllRemoques();
        res.status(200).json({
            success: true,
            count: remoques.length,
            data: remoques
        })
        
    } catch(error){
        next(error);
    }
}

// @desc Modifier une remorque
// @route PUT /api/remoque/:id
const updateRemoque = async(req, res, next) => {
    try{
        const remoque = await RemoqueService.updateRemoque(req.params.id, req.body);
        res.status(200).json({
            success: true,
            data: remoque
        })

    } catch(error){
        next(error)
    }
}

// @desc Suppression d'une remorque
// @route DELETE /api/remoque/:id
const deleteRemoque = async(req, res, next) => {
    try{
        await RemoqueService.deleteRemoque(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Remorque supprimée'
        })

    } catch(error){
        next(error)
    }
}

export default {createRemoque, getAllRemoques, updateRemoque, deleteRemoque}