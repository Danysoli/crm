import dotenv from 'dotenv';
import express, { Application, Express } from 'express';
import cors from 'cors';
import db from '../db/connection';
import userRoutes from '../routes/user';
import authRoutes from '../routes/auth';
import customerRoutes from '../routes/customer'
import productRoutes from '../routes/product'
import quoteRoutes from '../routes/quote'

dotenv.config();

class Server {
    private app: Application;
    private port: string | undefined;
    private apiPaths = {
        user: '/api/user',
        auth: '/api/auth',
        quote: '/api/quote',
        role: '/api/role',
        product: '/api/product',
        customer: '/api/customer'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.dbConnection();
        this.middelware();
        this.routes();
    }

    async dbConnection(){
        try {
            await db.authenticate();
            console.log('database online')
        }catch ( error ) {
            console.log(error)
        }
    }

    middelware(){
        this.app.use(express.json());

        this.app.use(cors());
        
        //this.app.use('/uploads', express.static('uploads'))
    
    }

    routes(){
        this.app.use(this.apiPaths.user, userRoutes )
        this.app.use(this.apiPaths.auth, authRoutes )
        this.app.use(this.apiPaths.customer, customerRoutes)
        this.app.use(this.apiPaths.product, productRoutes)
        this.app.use(this.apiPaths.quote, quoteRoutes)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Corriendo en el puerto: ${this.port}`)
        })
    }
}

export default Server;  