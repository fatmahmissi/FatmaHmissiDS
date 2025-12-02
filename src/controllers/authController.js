const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Fonction pour créer un nouvel utilisateur (signup)
async function signup(req, res) {
  const { nom, login, password, role } = req.body;
  if (!nom || !login || !password || !role)
    return res.status(400).json({ message: "Champs manquants" });  // Vérification des champs → ken fama champ manquant

  try {
    const existingUser = await User.findOne({ login });  // Vérifier si le login existe déjà
    if (existingUser) return res.status(400).json({ message: "Login déjà utilisé" });

    const hashedPassword = await bcrypt.hash(password, 10); // Hasher le mot de passe avant de sauvegarder
      //nasn3o nouvel utilisateur
    const newUser = await User.create({
      nom,
      login,
      password: hashedPassword,
      role
    });

    // nrj3o confirmation + info de l'utilisateur
    res.status(201).json({ message: "Utilisateur créé", user: newUser });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });  // Erreur serveur
  }
}
// Fonction pour connecter un utilisateur (login)
async function login(req, res) {
  const { login, password } = req.body;

  try {
    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ login });
    if (!user) return res.status(400).json({ message: "Login ou mot de passe invalide" });
    // nCompari le mot de passe li dakhlto  m3a mtaa   base
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Login ou mot de passe invalide" });
// nsann3o  un token JWT 
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: "Connexion réussie", token });   // narj3o  message + token
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message }); // Erreur serveur
  }
}

module.exports = { signup, login };
