import { Router } from "express";
import { consultUser, consultUserById, saveUsers, updateUsers, deleteUsers } from '../controllers/user';
import upload from "../helpers/multer";
const router = Router()

router.get('/consultar-usuario', consultUser)
router.post('/guardar-usuario', saveUsers) //, upload.single('file')
router.get('/consultar-usuario/:id', consultUserById)
router.put('/actualizar-usuario', updateUsers)
router.delete('/eliminar-usuario/:id', deleteUsers)

router.get('*', (req,res) =>{
    res.status(404).json({
        msg: 'Error 404 | Page not found'
    })
})

export default router;