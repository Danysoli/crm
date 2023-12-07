import { Router } from "express";
import { consultCostumer, consultCustomerById, deleteCustomers, saveCustomers, updateCustomers } from "../controllers/customer";

const router = Router()

router.get('/consultar-cliente', consultCostumer)
router.post('/guardar-cliente', saveCustomers)
router.put('/actualizar-cliente', updateCustomers)
router.delete('/eliminar-cliente/:id', deleteCustomers)
router.get('/consultar-cliente/:id', consultCustomerById)

router.get('*', (req,res) =>{
    res.status(404).json({
        msg: 'Error 404 | Page not found'
    })
})

export default router;