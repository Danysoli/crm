import { Router } from 'express';
import { login, logout, validateToken } from '../controllers/auth';
import validateJWT from '../helpers/validate-jwt';

const router = Router() 

router.post('/login', login)
router.post('/logout', validateJWT, logout)
router.post('/validate-Token', validateJWT, validateToken)

// router.get('*', (req, res) => {
//     res.status(404).json({
//         msg: 'Error 404 | Page not found'
//     })
// })

export default router;