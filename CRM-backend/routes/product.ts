import { Router } from "express";
import { consultProduct, consultProductById, deleteProduct, saveProducts, updateProducts } from "../controllers/product";

const router = Router()

router.get('/consultar-producto', consultProduct)
router.post('/guardar-producto', saveProducts)
router.put('/actualizar-producto', updateProducts)
router.delete('/eliminar-producto/:id', deleteProduct)
router.get('/consultar-producto/:id', consultProductById)

router.get('*', (req,res) =>{
    res.status(404).json({
        msg: 'Error 404 | Page not found'
    })
})

export default router;