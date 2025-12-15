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
// @route POST/api/trajets
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
// @route POST/api/trajets
const getMyTrajets = async (req, res, next) => {
  try {
    const trajets = await TrajetService.getDriverTrajets(req.user.id);
    res.status(200).json({
      success: true,
      count: trajets.length,
      data: trajets,
    });
  } catch (error) {
    next(error);
  }
};

export default { createTrajet, getAllTrajets, getMyTrajets };
