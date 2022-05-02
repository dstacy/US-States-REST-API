const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const statesController = require('../../controllers/statesController');
const verifyState = require('../../middleware/verifyState');
const verifyContig = require('../../middleware/verifyContig');
const funFactsController = require('../../controllers/funFactsController');

router.route('/')
    .get(verifyContig, statesController.getAllStates)
    .post(funFactsController.createNewFact);

router.route('/:code')
    .get(verifyState, statesController.getState)

router.route('/:code/funfact')
    .get(verifyState, funFactsController.getRandomFact);

router.route('/:code/capital')
    .get(verifyState, statesController.getCapital);

router.route('/:code/nickname')
    .get(verifyState, statesController.getNickname);

router.route('/:code/population')
    .get(verifyState, statesController.getPopulation);

router.route('/:code/admission')
    .get(verifyState, statesController.getAdmission);

module.exports = router;