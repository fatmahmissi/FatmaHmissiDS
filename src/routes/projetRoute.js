const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const isManager = require('../middleware/isManager');
const projetController = require('../controllers/projetController');
const rechercheTriProjetController = require('../controllers/rechercheTriProjet');

// Créer un projet
router.post('/create', auth, projetController.createProjet);

//  Voir les projets
router.get('/all', auth, projetController.getProjets);

// Modifier un projet
router.put('/update/:id', auth, projetController.updateProjet);

//  Supprimer un projet
router.delete('/delete/:id', auth, projetController.deleteProjet);

//  recherche + tri
router.get('/recherche-tri', auth, rechercheTriProjetController.rechercheTriProjet);

module.exports = router;
