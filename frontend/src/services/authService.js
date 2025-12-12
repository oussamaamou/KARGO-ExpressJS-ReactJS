import api from "./api";

const login = async(email, password) => {
    const response = await api.post('/api/auth/login', {email, password});

    if(response.data.token){
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;

}

const logout = () => {
    localStorage.removeItem('user');
}

export default {login, logout};