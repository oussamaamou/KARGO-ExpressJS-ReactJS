import { useAuth } from "../../context/AuthContext";

const Profile = () => {

    const { user } = useAuth();

    if(!user) return <h1>Loading</h1>
    return(

        <div>
            <h1> Nom : {user?.nom}</h1>
            <h1> Prenom : {user?.prenom}</h1>
            <h1> Role : {user?.role}</h1>
            <h1> Numero du Permis : {user?.numeroPermis}</h1>
        </div>
    )



}

export default Profile;