import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { ConnectDB } from "./src/config/db.js";

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

async function startServer(){
    try{
        await ConnectDB(MONGO_URI);
        app.listen( PORT, () => {
            console.log(`Serveur lancé sur http://localhost:${PORT}`);
        })

    } catch(error){
        console.error('Erreur au démarrage du serveur :', error);

    }

}

startServer();