const Tache = require('../models/tache'); 

//  Récupérer les tâches b recherche w tri
async function rechercheTriTache(req, res) {
  try {
    let filter = {}; 
    // Object vide bach n7oto fih filtre

    // User normal ychouf ken tâches mta3ou
    if (req.user.role !== "manager") {
      filter.utilisateur_assigne = req.user.id; 
      // ken user normal : ychouf ken tâches assigned lilou
    }

    //  Recherche par titre de tâche
    if (req.query.search) {
      filter.titre = { $regex: req.query.search, $options: "i" }; //regex bech ynajem ya9ra hta nos kelma
      // "i" = insensible aux maj/min
    }

    //  Tri 
    let sort = {};
    if (req.query.sort) {
      if (req.query.sort === "date") sort.date_de_creation = -1; 
      // tri décroissant par date
      if (req.query.sort === "statut") sort.statut = 1; 
      // tri croissant par statut : todo - doing - done
    }

    //  N7otou requête MongoDB m3a filter w tri
      const taches = await Tache.find(filter).sort(sort);
    res.json(taches);

  } catch (err) {
    // Ken fama erreur
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
}

module.exports = { rechercheTriTache };
