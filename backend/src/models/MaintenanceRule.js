import mongoose from "mongoose";

const maintenanceRuleSchema = new mongoose.Schema({
    type: { 
        type: String, 
        default: "global" 
    }, 
    seuilVidangeKm: {
        type: Number,
        default: 15000, 
        required: true
    },
    seuilPneusKm: {
        type: Number,
        default: 50000, 
        required: true
    }
}, { timestamps: true });

const MaintenanceRule = mongoose.model("MaintenanceRule", maintenanceRuleSchema);
export default MaintenanceRule;