import api from './api';

const getAllRemoques = async() => {
    const response = await api.get('/remoque');

    return response.data;
}

const createRemoque = async(remoqueData) => {
    const response = await api.post('/remoque', remoqueData);

    return response.data;
}

const deleteRemoque = async(id) => {
    const response = api.delete(`/remoque/${id}`, id);

    return response.data;
}

export default {getAllRemoques, createRemoque, deleteRemoque};