const Projet = require('../models/projet'); 


//  Fonction pour récupérer projets b  recherche w tri
async function rechercheTriProjet(req, res) {
  try {
    let filter = {}; 
    //  Object vide bach n7oto fih les conditions ta3 filtration

    //  Si l'user maouch manager : ychouf ken projets mta3ou
    if (req.user.role !== "manager") {
      filter.proprietaire_du_projet = req.user.id;
      // l'utilisateur normal ychouf ken les projets mta3ou
    }

    //  Recherche  par nom du projet
    if (req.query.search) {
      filter.nom_du_projet = { $regex: req.query.search, $options: "i" };  // $regex : bach nlawjou b kelma
      // "i" = insensible aux majuscules ou minuscules
    }

    // Tri 
    let sort = {};
    if (req.query.sort) {
      if (req.query.sort === "date") sort.date_de_creation = -1; 
      // -1 = tri décroissant par date (les projets récents mn louwl )
      if (req.query.sort === "statut") sort.statut = 1; 
      // 1 = tri croissant par statut (alphabetiquement)
    }

    //  N7otou requête MongoDB m3a filter w tri
    const projets = await Projet.find(filter).sort(sort);
    // find(filter) = n7otou filtre
    // sort(sort) = n7otou tri

    //  N3aytou lprojets fil response
    res.json(projets);

  } catch (err) {
    // Ken fama erreur
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
}

module.exports = { rechercheTriProjet };
// 🔹 Exporter la fonction bach nist3mlouha fil routes
