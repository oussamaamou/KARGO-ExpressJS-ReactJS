import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
        "Content-Type": "application/json",
    },
})

api.interceptors.request.use(
    (config) => {
        const storedUser = localStorage.getItem('user');
        
        if(storedUser){
            const parsedUser = JSON.parse(storedUser);
            
            if(parsedUser.token) {
                config.headers.Authorization = `Bearer ${parsedUser.token}`;
            }
        }
        return config;

    },
    (error) => Promise.reject(error)
)


export default api;