import api from "./api";

const register = async(userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
}

const login = async(email, password) => {
    const response = await api.post('/auth/login', {email, password});

    if(response.data.token){
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;

}

const logout = () => {
    localStorage.removeItem('user');
}

const getChauffeurs = async () => {
    const response = await api.get('/chauffeurs'); 
    return response.data;
};

export default {login, logout, getChauffeurs, register};