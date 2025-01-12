const express = require('express');
const router = express.Router();
const policyController = require('../controllers/policy-controller');


router.post('/', policyController.createPolicy);
router.get('/', policyController.getAllPolicies);
router.get('/:id', policyController.getPolicyById);
router.put('/:id', policyController.updatePolicy);
router.delete('/:id', policyController.deletePolicy);

module.exports = router;