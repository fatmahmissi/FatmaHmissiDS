const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const isManager = require('../middleware/isManager');
const tacheController = require('../controllers/tacheController');
const rechercheTriTacheController = require('../controllers/rechercheTriTache');

router.post('/create', auth, tacheController.createTache);// Route bch tcréyi tâche w ynajm y3mlha ay utilisateur (auth obligatoire)
router.post('/assign', auth, isManager, tacheController.assignTache);// Route bch manager bark yassigni tâche le user okher
router.get('/all', auth, tacheController.getTaches);// Route bch traja3 kol les tâches (user  ychouf ken tache mt3ou)
//  manager ychouf tache  lkol
router.put('/:id', auth, tacheController.updateTache);// Route bch tabdel tâche 
router.delete('/:id', auth, tacheController.deleteTache); // Route bch tfaskh tâche
// Recherche + tri
router.get('/recherche-tri', auth, rechercheTriTacheController.rechercheTriTache);

module.exports = router;
