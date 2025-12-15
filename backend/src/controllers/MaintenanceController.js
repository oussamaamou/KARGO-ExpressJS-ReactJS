import MaintenanceService from "../services/MaintenanceService.js";

// @desc Afficher les regles de maintenance
// @route POST/api/maintenance/regles
const getRules = async (req, res, next) => {
  try {
    const rules = await MaintenanceService.getRules();
    res.status(200).json({ 
        success: true, 
        data: rules 
    });
  } catch (error) {
    next(error);
  }
};

// @desc Modifier les regles de maintenance
// @route POST/api/maintenance/regles
const updateRules = async (req, res, next) => {
  try {
    const rules = await MaintenanceService.updateRules(req.body);
    res.status(200).json({ 
        success: true, 
        data: rules 
    });
  } catch (error) {
    next(error);
  }
};

export default { getRules, updateRules };
