const mongoose = require("mongoose");

//   3malna création lel schema taa "Projet" eli bech yetsajjel fil base MongoDB
const projetSchema = new mongoose.Schema({
    nom_du_projet: { type: String, required: true }, // requis
    description: { type: String },
    proprietaire_du_projet: { type: mongoose.Schema.Types.ObjectId, ref: "User" },     
    // ref: "User" yaani réference lel user elli 3andou lprojet
    // type ObjectId: ykhou l’ID taa user men collection "User"

    statut: { type: String, enum: ["en cours", "terminé", "en pause"], default: "en cours" },
    date_de_creation: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Projet", projetSchema); // export lel modèle "Projet" bech najmou nist3mlouh fel routes wel controllers
