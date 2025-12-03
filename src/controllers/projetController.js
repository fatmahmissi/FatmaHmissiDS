const Projet = require('../models/projet');

// nasn3o projet ay  utilisateur authentifié
async function createProjet(req, res) {
  try {
    const { nom_du_projet, description, statut } = req.body;

    if (!nom_du_projet) {
      return res.status(400).json({ message: "Le nom du projet est requis" }); // kn l'utilisateur ma3milch nom du projet → erreur
    }
    //nasn3o  projet jdid 
    const projet = await Projet.create({
      nom_du_projet,
      description,
      statut,
      proprietaire_du_projet: req.user.id // récupéré depuis le token  proprietaire = req.user.id  yaani l’ID taa l'utilisateur elli connecté (min JWT)
    });

    res.status(201).json({ message: "Projet créé", projet });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
}

// Récupérer les projets
// User normal : ya9ra ken projet mte3ou
// Manager : ya9ra kol projets taa kol utilisateurs
async function getProjets(req, res) {
  try {
    let projets;
     //  Si manager yaffichi kol projets (populate yaffichi details propietaire)
    if (req.user.role === "manager") {
      projets = await Projet.find().populate("proprietaire_du_projet", "nom login");
    } else {  //  Sinon user normal yaffichi ken projets mte3ou barka
      projets = await Projet.find({ proprietaire_du_projet: req.user.id });
    }

    res.json(projets);

  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
}

//  Modifier un projet (PUT)
async function updateProjet(req, res) {
  const { id } = req.params;
  const { nom_du_projet, description, statut } = req.body;

  try { // nlawjo aala  projet min l'ID
    const projet = await Projet.findById(id);
    if (!projet) {
      return res.status(404).json({ message: "Projet non trouvé" });
    }

    // User normal ynajem ybadel  **ken projet mte3ou**
    // Manager yenjm yabdel  kol projets
    if (req.user.role !== "manager" && projet.proprietaire_du_projet.toString() !== req.user.id) {
      return res.status(403).json({ message: "Vous n'avez pas l'autorisation de modifier ce projet" });
    }
      //  Mise à jour selon chnowa l'utilisateur baddel
    if (nom_du_projet) projet.nom_du_projet = nom_du_projet;
    if (description) projet.description = description;
    if (statut) projet.statut = statut;

    await projet.save(); //  Enregistrement fil base

    res.json({ message: "Projet mis à jour", projet });

  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
}

// Supprimer un projet (DELETE)
async function deleteProjet(req, res) {
  const { id } = req.params;

  try { //  Nalwjo aala  projet eli bech nfas5ouh b id 
    const projet = await Projet.findById(id);
    if (!projet) {
      return res.status(404).json({ message: "Projet non trouvé" });
    }

    // User : ken projet mte3ou yfaskh
    // Manager : kol projets ynajem yfaskho 
    if (req.user.role !== "manager" && projet.proprietaire_du_projet.toString() !== req.user.id) {
      return res.status(403).json({ message: "Vous n'avez pas l'autorisation de supprimer ce projet" });
    }

    await projet.deleteOne(); // Fas5 projet

    res.json({ message: "Projet supprimé avec succès" });

  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
}

module.exports = { 
  createProjet, 
  getProjets, 
  updateProjet, 
  deleteProjet 
};
