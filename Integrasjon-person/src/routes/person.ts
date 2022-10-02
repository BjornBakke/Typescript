import express from 'express';
import controller from '../controllers/person';

const router = express.Router();

router.get('/personer', controller.getPersoner);
router.get('/personer/:id', controller.getPerson);
router.put('/personer/:id', controller.updatePerson);
router.delete('/personer/:id', controller.deletePerson);
router.post('/personer', controller.addPerson);

export = router;