const Router = require('express');
const router = new Router();
const taskController = require('../controllers/taskController');
const checkRole = require('../middleware/checkRoleMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, taskController.create);
router.get('/', taskController.getAll);
router.get('/:id', taskController.getOne);
router.put('/:id', taskController.update);
router.delete('/:id', checkRole('ADMIN'), taskController.delete);

module.exports = router;