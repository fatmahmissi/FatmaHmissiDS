const mongoose = require("mongoose");

const tacheSchema = new mongoose.Schema({
    titre: { type: String, required: true }, // requis
    description: { type: String },
    statut: { type: String, enum: ["todo", "doing", "done"], default: "todo" },
    deadline: { type: Date },
    projet_associe: { type: mongoose.Schema.Types.ObjectId, ref: "Projet" },
     // ID du projet li tache liée bih
    // ref: "Projet" bech mongoose ya3ref lel modèle Projet
    utilisateur_assigne: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
    // ID utilisateur li assigné lel tache
    // ref: "User" bech mongoose ya3ref lel modèle User

    date_de_creation: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Tache", tacheSchema);
