import DashboardService from "../services/DashboardService.js";

const getDashboardStats = async (req, res, next) => {
    try {
        const stats = await DashboardService.getStats();
        res.status(200).json({ success: true, data: stats });
    } catch (error) {
        next(error);
    }
};

export default { getDashboardStats };