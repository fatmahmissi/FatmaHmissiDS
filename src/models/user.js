const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
// Création du schema mta3 l'utilisateur
const userSchema = new mongoose.Schema({
  nom: { type: String },
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "manager"], default: "user" },
  date_de_creation: { type: Date, default: Date.now }
});

// Méthode pour comparer le mot de passe
userSchema.methods.comparePassword = function(password) {
  // ki yconnecti l'utilisateur, ncompariw el password mta3 l'input m3a li fel base
  return bcrypt.compare(password, this.password);
};
// Exporter le model
module.exports = mongoose.model("User", userSchema);
