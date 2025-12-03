const Tache = require('../models/tache');
const Projet = require('../models/projet');

//  Créer une tâche rattachée à un projet (tout utilisateur)
async function createTache(req, res) {
  try {
    const { titre, description, statut, deadline, projet_associe } = req.body; // nrecupere données li bch ykounou fi body mta3 request


    if (!titre || !projet_associe) {
      return res.status(400).json({ message: "Le titre et le projet associé sont requis" });
    }  // vérification : titre w projet_associe mouch mawjoud => return erreur 400

    // Vérifier si le projet existe
    const projet = await Projet.findById(projet_associe); // ncherche fi DB le projet par son ID
    if (!projet) {
      return res.status(404).json({ message: "Projet non trouvé" });
    }

    const tache = await Tache.create({
      titre,
      description,
      statut,
      deadline,
      projet_associe,
      utilisateur_assigne: req.user.id // par défaut, le créateur :  utilisateur qui crée la tâche par défaut comme assigné
    });

    res.status(201).json({ message: "Tâche créée", tache }); // kn kol shay  ok return tache cree avec status 201
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
}

// Assigner une tâche à un utilisateur (manager seulement)
async function assignTache(req, res) {
  try {
    const { tacheId, utilisateurId } = req.body;   // nrecupere ID tache et ID utilisateur a assigner depuis body


    const tache = await Tache.findById(tacheId); // recherche tâche bel  ID

    if (!tache) return res.status(404).json({ message: "Tâche non trouvée" });

    tache.utilisateur_assigne = utilisateurId; //on nkhaliw l'utilisateur choisi comme assigné
    await tache.save(); // on sauvegarde modification dans DB

    res.json({ message: "Tâche assignée", tache });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
}

//  Récupérer toutes les tâches 
async function getTaches(req, res) {
  try {
    let filter = {}; // nasn3o objet vide

    // Si utilisateur normal => on ne récupère que ses tâches
    if (req.user.role !== "manager") {
      filter.utilisateur_assigne = req.user.id; // juste ses tâches
    }

    // Requête MongoDB
    const taches = await Tache.find(filter)
      .populate("projet_associe", "nom_du_projet") // remplacer l'ID projet par son nom
      .populate("utilisateur_assigne", "nom login"); // remplacer ID user par nom + login

    res.json(taches); // // nraj3o les tâches récupérées
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
}

//  Modifier une tâche (titre, description, statut, deadline)
async function updateTache(req, res) {
  try {
    const { id } = req.params; //recupere ID tâche depuis params URL
    const { titre, description, statut, deadline } = req.body; // recupere données modifiées depuis body

    const tache = await Tache.findById(id); // cherche tâche par ID
    if (!tache) return res.status(404).json({ message: "Tâche non trouvée" });  // si pas trouvé  return 404
// si user normal essaye de modifier tâche qui n'est pas assignée à lui  accès refusé
    if (req.user.role !== "manager" && tache.utilisateur_assigne.toString() !== req.user.id) {
      return res.status(403).json({ message: "Accès refusé" });
    }
 // on met à jour seulement les champs fournis
    if (titre) tache.titre = titre;
    if (description) tache.description = description;
    if (statut) tache.statut = statut;
    if (deadline) tache.deadline = deadline;

    await tache.save(); // sauvegarde modifications dans DB
    res.json({ message: "Tâche mise à jour", tache }); // retourne tâche mise à jour
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
}

//  Supprimer une tâche
async function deleteTache(req, res) {
  try {
    const { id } = req.params;  // recupere ID tâche depuis params


    const tache = await Tache.findById(id); // cherche tâche par ID
    if (!tache) return res.status(404).json({ message: "Tâche non trouvée" });  // si pas trouvé return 404

    if (req.user.role !== "manager" && tache.utilisateur_assigne.toString() !== req.user.id) {
      return res.status(403).json({ message: "Accès refusé" });
    } // si user normal essaye de supprimer tâche non assignée à lui => accès refusé

    await tache.deleteOne();    // supprime tâche de DB
    res.json({ message: "Tâche supprimée" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
}

module.exports = { createTache, assignTache, getTaches, updateTache, deleteTache };
