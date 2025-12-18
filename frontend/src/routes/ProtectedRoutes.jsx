import {Navigate, Outlet} from 'react-router-dom';
import Loader from '../components/common/loader/Loader';
import { useAuth } from '../context/AuthContext';


const ProtectedRoutes = ({ allowedRoles}) => {
    const {user, loading} = useAuth();

    if(loading){
        return <Loader />;
    }

    if(!user){
        return <Navigate to='/login' replace />
    }

    if(allowedRoles && !allowedRoles.includes(user.role)){
        return <Navigate to='/login' replace />
    }

    return <Outlet />;

}

export default ProtectedRoutes;