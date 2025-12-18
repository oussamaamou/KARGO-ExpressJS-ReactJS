import {Navigate, Outlet} from 'react-router-dom';
import { useAuth } from '../context/authContext';
import Loader from '../components/common/loader/Loader';


const ProtectedRoutes = ({ allowedRoles}) => {
    const {user, loading} = useAuth();

    if(loading){
        return <Loader />;
    }

    if(!user){
        return <Navigate to='/login' replace />
    }

    if(allowedRoles && !allowedRoles.includes(user.user.role)){
        return <Navigate to='/login' replace />
    }

    return <Outlet />;

}

export default ProtectedRoutes;