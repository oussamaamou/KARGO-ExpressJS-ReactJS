import MaintenanceRule from "../models/MaintenanceRule.js";

const getRules = async () => {
    let rules = await MaintenanceRule.findOne({ type: "global" });
    if (!rules) {
        rules = await MaintenanceRule.create({ type: "global" });
    }
    return rules;
};

const updateRules = async (data) => {
    const rules = await MaintenanceRule.findOneAndUpdate(
        { type: "global" },
        { 
            seuilVidangeKm: data.seuilVidangeKm,
            seuilPneusKm: data.seuilPneusKm
        },
        { new: true, upsert: true } 
    );
    return rules;
};

export default { getRules, updateRules };