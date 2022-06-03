//la logique de routing (pour l'utilisateur)

const express = require('express');

const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middelware/auth');

//const Password = require('../middleware/Password');


// pour créer un nouveau copmte
router.post('/signup', userCtrl.signup);
// se connecter 
router.post('/login', userCtrl.login);
//recupérer un utilisateur
router.get('/:id', userCtrl.getOneUser);
router.get('/', userCtrl.getAllUsers);
router.put('/:id', auth, userCtrl.modifyUser);
router.delete('/:id', userCtrl.deleteUser);

module.exports = router;