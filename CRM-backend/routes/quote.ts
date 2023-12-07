import { Router } from "express";
import { consultQuote, saveQuote } from "../controllers/quote";

const router = Router()

router.get('/consultar-cotizacion/:idQuote', consultQuote)
router.post('/guardar-cotizacion', saveQuote)

router.get('*', (req,res) =>{
    res.status(404).json({
        msg: 'Error 404 | Page not found'
    })
})

export default router;