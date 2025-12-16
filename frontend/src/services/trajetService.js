import api from "./api";

const getAllTrajets = async () => {
    const response = await api.get('/trajets');
    return response.data;
};

const createTrajet = async (trajetData) => {
    const response = await api.post('/trajets', trajetData);
    return response.data;
};

const getMyTrajets = async () => {
    const response = await api.get('/mes-trajets');
    return response.data;
};

const updateStatus = async (id, status, data = null) => {
    const payload = { status, ...data };
    const response = await api.patch(`/trajets/${id}/status`, payload);
    return response.data;
};

export default {
    getAllTrajets,
    createTrajet,
    getMyTrajets,
    updateStatus
};