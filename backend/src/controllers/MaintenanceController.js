import MaintenanceService from "../services/MaintenanceService.js";

const getRules = async (req, res, next) => {
    try {
        const rules = await MaintenanceService.getRules();
        res.status(200).json({ success: true, data: rules });
    } catch (error) {
        next(error);
    }
};

const updateRules = async (req, res, next) => {
    try {
        const rules = await MaintenanceService.updateRules(req.body);
        res.status(200).json({ success: true, data: rules });
    } catch (error) {
        next(error);
    }
};

export default { getRules, updateRules };