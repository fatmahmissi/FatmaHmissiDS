// Middleware pour vérifier si l'utilisateur est un manager
function isManager(req, res, next) {  // ken role mta3 l'utilisateur mahech 'manager' → accès refusé
  if (req.user.role !== 'manager') {
    return res.status(403).json({ message: 'Accès réservé aux managers' });
  }
  next(); // sinon, l'utilisateur est manager → ntaado lel route suivante
}

module.exports = isManager;
