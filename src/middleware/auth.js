const jwt = require('jsonwebtoken');

// Middleware pour vérifier si l'utilisateur est connecté
function auth(req, res, next) {
  // na5thou token men headers → format: "Bearer <token>"
  const token = req.headers['authorization']?.split(' ')[1]; 
  if (!token) return res.status(401).json({ message: 'Accès refusé, token manquant' });  // ken ma famash token → accès refusé

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // vérification du token avec le secret
    req.user = decoded; // n7ottou l'info mta3 l'utilisateur fel request (id, role)
    next(); // ntaadiw  lel route suivante
  } catch (err) {
    res.status(401).json({ message: 'Token invalide' }); // si token invalide → accès refusé
  }
}

module.exports = auth;

