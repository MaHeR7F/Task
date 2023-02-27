const express = require("express");
const bodyParser = require ("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const taskApiRoutes = require("./routes/api/taskApiRoutes");
const taskRoutes = require("./routes/taskRoutes");

// recupère l'application express
const app = express();

app.use(express.urlencoded({ extended : true}));

// charge le fichier de configuration 
dotenv.config();

// défini le moteur de rendu
app.set('view engine', 'ejs');

// défine le dossier ou se trouve les vues
app.set('views',__dirname + "/views");

// parse pour les formulaires
app.use(bodyParser.urlencoded({ extended: false}));

// parse pour les json
app.use(bodyParser.json());


//suprimme le message Derecationwarning
mongoose.set('strictQuery', true);

// effectue la connexion à mongoBD
mongoose.connect(process.env.MONGO_CONNECTION,
{
useNewUrlParser: true,
useUnifiedTopology: true,
})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch((error) => console.log("Connexion à MongoDB échouée " + error));


//On specifie les routes

//indique l'url de depart des routes pour ApiRoute
app.use("/api", taskApiRoutes)

//indique l'url de depart des routes pour taskRoutes
app.use("/", taskRoutes)

 // Cas par défaut si les autres urls n'ont pas matché
 app.use((req, res) => {
    res.status(404);    
    //res.send("Page introuvable");
    res.render('404');
});

// IMPORTANT démarrer le serveur sur le port 8093
app.listen(8093, () => {
    console.log("Le serveur est démarré sur le port 8093");
});

