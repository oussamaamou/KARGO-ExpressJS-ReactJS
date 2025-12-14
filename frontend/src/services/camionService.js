import api from './api';

const getAllCamions = async() => {
    const response = await api.get('/camion');

    return response.data;
}

const createCamion = async(camionData) => {
    const response = await api.post('/camion', camionData);

    return response.data;
}

const deleteCamion = async(id) => {
    const response = api.delete(`/camion/${id}`, id);

    return response.data;
}

export default {getAllCamions, createCamion, deleteCamion};