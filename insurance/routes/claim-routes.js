const express = require('express');
const router = express.Router();
const claimController = require('../controllers/claim-controller');

router.post('/', claimController.createClaim);
router.get('/', claimController.getAllClaims);
router.get('/:id', claimController.getClaimById);
router.put('/:id', claimController.updateClaim);
router.delete('/:id', claimController.deleteClaim);
router.get('/statistics', claimController.getClaimStatistics);

module.exports = router;