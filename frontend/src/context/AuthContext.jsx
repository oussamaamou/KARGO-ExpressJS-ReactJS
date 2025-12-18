import { createContext, useState, useEffect, useContext } from "react";
import authService from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if(storedUser){
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);

    }, [])

    // Action de register
    const register = async(useData) => {
        try{
            const data = await authService.register(useData);
            return {
                success: true,
                message: data.message
            }

        } catch(error){
            const message =error.response?.data?.message || "Erreur d'inscription";
            return {
                success: false,
                message
            }
        }
    }

    // Action de login
    const login = async(email, password) => {
        try{
            const data = await authService.login(email, password);
            setUser(data);
            return{
                success: true,
                role: data.user.role
            }

        } catch(error){
            const message = error.response?.data?.message || "Erreur de connexion";
            return { 
                success: false, 
                message 
            }
        }

    }

    // Action de logout
    const logout = () => {
        authService.logout();
        setUser(null);
    }

    return(
        <AuthContext.Provider value={{login, logout, user, loading, register}}>
            {!loading && children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => useContext(AuthContext);