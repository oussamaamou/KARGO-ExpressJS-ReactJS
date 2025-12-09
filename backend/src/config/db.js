import mongoose from "mongoose";

export async function ConnectDB(uri){
    try{
        mongoose.set('strictQuery', true);
        await mongoose.connect(uri);
        console.log("Connexion MongoDB réussie");

    } catch(error){
        console.error('Erreur de Connexion MongoDB :', error);
        process.exit(1);

    }

}