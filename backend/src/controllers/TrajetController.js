import TrajetService from "../services/TrajetService.js";

// @desc Creér un trajet
// @route POST/api/trajets
const createTrajet = async (req, res, next) => {
  try {
    const trajet = await TrajetService.createTrajet(req.body);
    res.status(201).json({
      success: true,
      data: trajet,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Afficher tous les trajets
// @route GET/api/trajets
const getAllTrajets = async (req, res, next) => {
  try {
    const trajets = await TrajetService.getAllTrajets();
    res.status(200).json({
      success: true,
      count: trajets.length,
      data: trajets,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Afficher les trajets assignés
// @route GET/api/trajets
const getMyTrajets = async (req, res, next) => {
  try {
    const trajets = await TrajetService.getChauffeurTrajets(req.user.id);
    res.status(200).json({
      success: true,
      count: trajets.length,
      data: trajets,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Modifier le statut d'un trajet
// @route PUT/api/trajets
const updateStatus = async (req, res, next) => {
    try {
        const { status, kilometrageArrivee, carburantConsomme } = req.body;
        
        const trajet = await TrajetService.updateTrajetStatus(
            req.params.id, 
            status, 
            { kilometrageArrivee, carburantConsomme }
        );
        
        res.status(200).json({ success: true, data: trajet });
    } catch (error) {
        next(error);
    }
};

export default { createTrajet, getAllTrajets, getMyTrajets, updateStatus };
